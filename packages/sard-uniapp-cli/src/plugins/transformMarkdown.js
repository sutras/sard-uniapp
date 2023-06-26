import MarkdownIt from 'markdown-it'
import { normalizePath } from 'vite'
import path from 'node:path'
import { readFileSync, existsSync } from 'fs'
import {
  MD_DEMO_CODE_R,
  MD_DEMO_CODE_SEPARATOR,
  MD_PATH_R,
  ROOT_DIR,
} from '../utils/constants.js'
import { hlCallback } from '../utils/highlight.js'
import genHash from '../utils/genHash.js'

const renderStrategies = {
  markdown(code) {
    const html = code
      .replace(/`/g, '&#96;')
      .replace(/\f/g, '')
      .replace(/(?=<h[23])/g, '\f')
      .split('\f')
      .map((fragment) =>
        fragment.includes('<h3')
          ? `<div class="doc-card">${fragment}</div>`
          : fragment,
      )
      .join('')
      .split(/(?=<table)|(?<=<\/table>)/)
      .map((fragment) =>
        fragment.includes('<table')
          ? `<div class="doc-table-responsive">${fragment}</div>`
          : fragment,
      )
      .join('')

    return `<section class="doc-section">${genHash(html)}</section>`
  },

  demo(data) {
    return `<section class="doc-section">${data
      .map((demo) => {
        return `<Demo>{${demo.name}}</Demo>`
      })
      .join('\n')}</section>`
  },
}

function getVariables(text) {
  const result =
    /(?<=#variables)[\s\S]*?(?=\/\/\s*#endvariables)/.exec(text)?.[0] || ''
  return result
    .replace(/^\s*|\s*$/g, '')
    .replace(/^/, '```scss\n')
    .replace(/$/, '\n```')
}

function extractCssVariables(id) {
  const file = path.resolve(path.dirname(id), 'index.scss')

  if (existsSync(file)) {
    return getVariables(readFileSync(file, 'utf-8'))
  } else {
    return ''
  }
}

function transform(code, id, md) {
  if (!MD_PATH_R.test(id)) {
    return
  }

  let demoUrls = []

  let demoId = 0

  const html_block = md.renderer.rules.html_block
  md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const match = MD_DEMO_CODE_R.exec(token.content)
    if (match) {
      demoUrls.push(JSON.parse(match[1]))
      return MD_DEMO_CODE_SEPARATOR
    }
    return html_block(tokens, idx, options, env, self)
  }

  code = code.replace('%{variables}', () => {
    return extractCssVariables(id)
  })

  let html = md.render(code)

  const sections = html
    .split(MD_DEMO_CODE_SEPARATOR)
    .map((fragment, idx, { length }) => {
      const section = {
        type: 'markdown',
        data: fragment,
      }
      if (idx === length - 1) {
        return section
      }
      return [
        section,
        {
          type: 'demo',
          data: demoUrls[idx].map((url) => ({
            url: url,
            fullUrl: normalizePath(
              path.resolve(id, '..', url).replace(/\.\w+$/, ''),
            ),
            name: `Demo${++demoId}`,
            id: demoId,
          })),
        },
      ]
    })
    .flat()

  const content = `<script setup lang="ts">
    import Demo from '${normalizePath(
      path.resolve(ROOT_DIR, './src/site/desktop/components/Demo.vue'),
    )}'
      ${sections
        .filter((section) => section.type === 'demo')
        .map((section) => section.data)
        .flat()
        .map(
          (demo) =>
            `import ${demo.name}, { doc as doc${demo.id} } from '${demo.fullUrl}'\n` +
            `${demo.name}.doc = doc${demo.id}`,
        )
        .join('\n')}

    </script>

    <template>
      <div className="doc-content">
        ${sections
          .map((section) => {
            return renderStrategies[section.type](section.data)
          })
          .join('\n')}
      </div>
    </template>
  `

  return content
}

export function transformMarkdown() {
  const md = new MarkdownIt({
    html: true,
    highlight: hlCallback,
  })

  return {
    name: 'transformMarkdown',
    enforce: 'pre',
    transform(code, id) {
      return transform(code, id, md)
    },
  }
}
