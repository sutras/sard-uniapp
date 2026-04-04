import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { vitepressSnippetPlugin } from './snippetPlugin.mjs'

import packageJson from 'sard-uniapp/package.json' with { type: 'json' }

type DocMeta = {
  title: string
  subtitle?: string
  version?: string
  order: number
  groupTitle: string
  groupOrder: number
}

type DocPage = DocMeta & {
  link: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatPageText(page: DocMeta) {
  return [page.title, page.subtitle]
    .filter((value): value is string => Boolean(value))
    .map(escapeHtml)
    .join(' ')
}

function formatSidebarText(page: DocMeta) {
  const text = formatPageText(page)

  if (!page.version) {
    return text
  }

  return `${text} <sup class="sard-sidebar-version">${escapeHtml(page.version)}</sup>`
}

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const docsDir = path.resolve(currentDir, '..')
const rootDir = path.resolve(docsDir, '../..')
const snippetAliasRoots = [
  {
    find: '@demo',
    replacement: path.join(rootDir, 'src', 'pages', 'components'),
  },
  {
    find: '@comp',
    replacement: path.join(rootDir, 'packages', 'sard-uniapp', 'components'),
  },
  {
    find: '@lib',
    replacement: path.join(rootDir, 'packages', 'sard-uniapp'),
  },
  { find: '@src', replacement: path.join(rootDir, 'src') },
  { find: '@cwd', replacement: rootDir },
]

function stripQuotes(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, '')
}

function parseFrontmatter(content: string): DocMeta {
  const matched = content.match(/^---\n([\s\S]*?)\n---/)

  const meta: DocMeta = {
    title: '',
    order: Number.MAX_SAFE_INTEGER,
    groupTitle: '未分组',
    groupOrder: Number.MAX_SAFE_INTEGER,
  }

  if (!matched) {
    return meta
  }

  const lines = matched[1].split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const pair = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)

    if (!pair) {
      continue
    }

    const [, key, rawValue] = pair

    if (key === 'group') {
      if (rawValue) {
        meta.groupTitle = stripQuotes(rawValue)
        continue
      }

      while (index + 1 < lines.length && lines[index + 1].startsWith('  ')) {
        index += 1
        const nestedPair = lines[index]
          .trim()
          .match(/^([A-Za-z][\w-]*):\s*(.*)$/)

        if (!nestedPair) {
          continue
        }

        const [, nestedKey, nestedValue] = nestedPair

        if (nestedKey === 'title') {
          meta.groupTitle = stripQuotes(nestedValue)
        }

        if (nestedKey === 'order') {
          const order = Number(nestedValue)

          if (!Number.isNaN(order)) {
            meta.groupOrder = order
          }
        }
      }

      continue
    }

    if (key === 'title') {
      meta.title = stripQuotes(rawValue)
    }

    if (key === 'subtitle') {
      meta.subtitle = stripQuotes(rawValue)
    }

    if (key === 'version') {
      meta.version = stripQuotes(rawValue)
    }

    if (key === 'order') {
      const order = Number(rawValue)

      if (!Number.isNaN(order)) {
        meta.order = order
      }
    }
  }

  return meta
}

function readSectionPages(section: string): DocPage[] {
  const sectionDir = path.join(docsDir, section)

  if (!fs.existsSync(sectionDir)) {
    return []
  }

  return fs
    .readdirSync(sectionDir)
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'index.md')
    .map((fileName) => {
      const fullPath = path.join(sectionDir, fileName)
      const meta = parseFrontmatter(fs.readFileSync(fullPath, 'utf8'))
      const name = path.basename(fileName, '.md')

      return {
        ...meta,
        title: meta.title || name,
        link: `/${section}/${name}`,
      }
    })
}

function sortPages(pages: DocPage[]) {
  return [...pages].sort((left, right) => {
    if (left.order !== right.order) {
      return left.order - right.order
    }

    return left.title.localeCompare(right.title, 'zh-Hans-CN')
  })
}

function buildSidebar(
  pages: DocPage[],
  getItemText: (page: DocPage) => string = formatSidebarText,
): DefaultTheme.SidebarItem[] {
  const groups = new Map<
    string,
    { order: number; items: DefaultTheme.SidebarItem[] }
  >()

  for (const page of sortPages(pages)) {
    const group = groups.get(page.groupTitle) ?? {
      order: page.groupOrder,
      items: [],
    }

    group.order = Math.min(group.order, page.groupOrder)
    group.items.push({
      text: getItemText(page),
      link: page.link,
    })
    groups.set(page.groupTitle, group)
  }

  const groupedItems = [...groups.entries()]
    .sort((left, right) => {
      const [leftTitle, leftGroup] = left
      const [rightTitle, rightGroup] = right

      if (leftGroup.order !== rightGroup.order) {
        return leftGroup.order - rightGroup.order
      }

      return leftTitle.localeCompare(rightTitle, 'en-US')
    })
    .map(([title, group]) => ({
      text: title,
      items: group.items,
    }))

  return groupedItems
}

const guidePages = readSectionPages('guide')
const componentPages = readSectionPages('components')
const utilityPages = readSectionPages('utilities')

export default defineConfig({
  title: 'Sard Uniapp',
  description:
    'sard-uniapp 是一套基于 Uniapp + Vue3 框架开发的兼容多端的 UI 组件库',
  cleanUrls: true,
  markdown: {
    config(md) {
      md.block.ruler.disable(['snippet'])
    },
  },
  vite: {
    server: {
      watch: {
        ignored: [
          '!**/sard-uniapp/**',
          '**/node_modules/**',
          '**/uni_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/cache/**',
        ],
      },
    },
    build: {
      emptyOutDir: true,
    },
    resolve: {
      alias: snippetAliasRoots,
    },
    plugins: [
      vitepressSnippetPlugin({
        docsDir,
        aliasRoots: snippetAliasRoots.map(({ find, replacement }) => ({
          prefix: find as any,
          dir: replacement,
        })),
      }) as never,
    ],
  },
  head: [
    [
      'script',
      {},
      "var _hmt = _hmt || [];(function () { var hm = document.createElement('script'); hm.src = 'https://hm.baidu.com/hm.js?f83f5174c995e2f5c9520acb67f574b9'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s); })()",
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    outline: {
      level: [2, 3],
      label: '页面导航',
    },
    nav: [
      { text: '指引', link: '/guide/intro' },
      { text: '组件', link: '/components/button' },
      { text: '工具', link: '/utilities/atomic-css' },
      {
        text: packageJson.version,
        items: [
          {
            text: '更新日志 (Github)',
            link: 'https://github.com/sutras/sard-uniapp/blob/main/CHANGELOG.md',
          },
          {
            text: '更新日志 (Gitee)',
            link: 'https://gitee.com/sutras/sard-uniapp/blob/main/CHANGELOG.md',
          },
        ],
      },
      {
        text: '友情链接',
        items: [
          {
            text: 'Cosey Admin',
            link: 'https://docs.cosey.wzt.zone/',
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': buildSidebar(guidePages),
      '/components/': buildSidebar(componentPages),
      '/utilities/': buildSidebar(utilityPages),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sutras/sard-uniapp' },
      { icon: 'gitee', link: 'https://gitee.com/sutras/sard-uniapp' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present wuzhitao',
    },
    editLink: {
      pattern:
        'https://github.com/sutras/sard-uniapp/edit/main/packages/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '上次更新',
    },
    externalLinkIcon: true,
    search: {
      provider: 'local',
    },
  },
})
