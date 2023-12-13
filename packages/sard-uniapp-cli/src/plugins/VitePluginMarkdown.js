import MarkdownIt from 'markdown-it'
import fs from 'fs-extra'
import { MD_PATH_R } from '../utils/constants.js'
import { hlCallback } from '../utils/highlight.js'
import genHash from '../utils/genHash.js'
import { compileAtRule } from './md-at-rules/index.js'

const renderStrategies = {
  markdown(code) {
    const html = code
      // 转义模板字符串
      .replace(/([`])/g, '\\$1')

      // 转义大括号
      .replace(/([{}])/g, (m) => {
        return `&#${m.charCodeAt(0)};`
      })

      // 包裹表格
      .split(/(?=<table)|(?<=<\/table>)/)
      .map((fragment) =>
        fragment.includes('<table')
          ? `<div class="doc-table-responsive">${fragment}</div>`
          : fragment,
      )
      .join('')

      // 包裹高亮代码
      .split(/(?=<pre)|(?<=<\/pre>)/)
      .map((fragment) =>
        fragment.includes('<pre')
          ? `<div class="doc-code-wrapper">${fragment}</div>`
          : fragment,
      )
      .join('')

    return genHash(html)
  },
}

function transform(code, id, md) {
  if (!MD_PATH_R.test(id)) {
    return
  }

  code = compileAtRule(id, code)

  const html = md.render(code)

  const content = `<script setup lang="ts">
      import useCodeTool from "@@/components/code-tool/useCodeTool"
      useCodeTool()
      const html = \`${renderStrategies.markdown(html)}\`
    </script>

    <template>
      <div class="doc-content" v-html="html"></div>
    </template>
  `

  return content
}

export function VitePluginMarkdown(vuePlugin) {
  const md = new MarkdownIt({
    html: true,
    highlight: hlCallback,
  })

  return {
    name: 'VitePluginMarkdown',
    enforce: 'pre',
    transform(code, id) {
      return transform(code, id, md)
    },

    // md热更新
    async handleHotUpdate(ctx) {
      const { file } = ctx
      if (!MD_PATH_R.test(file)) {
        return
      }
      const code = await fs.readFile(file, 'utf-8')
      const compiledCode = transform(code, file, md)

      return vuePlugin.handleHotUpdate({
        ...ctx,
        read: () => compiledCode,
      })
    },
  }
}
