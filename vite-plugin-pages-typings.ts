import path from 'path'
import fs from 'fs'
import chokidar from 'chokidar'
import { type PluginOption } from 'vite'
import consola from 'consola'

interface Page {
  path: string
}

interface SubPackage {
  root: string
  pages: Page[]
}

interface PagesJson {
  pages: Page[]
  subPackages?: SubPackage[]
}

function getPagesPath(pagesJson: PagesJson) {
  function getPagesRoutes(pages: Page[]) {
    return pages.map((page) => page.path)
  }

  function getSubPackagesRoutes(subPackages: SubPackage[]) {
    return subPackages
      .map((pkg) => {
        return getPagesRoutes(pkg.pages).map((path) => pkg.root + '/' + path)
      })
      .flat()
  }

  function getRoutes(pagesJson: PagesJson) {
    return [
      ...getPagesRoutes(pagesJson.pages),
      ...getSubPackagesRoutes(pagesJson.subPackages || []),
    ]
  }

  return getRoutes(pagesJson)
}

export default function vitePluginPagesTypings() {
  const pagesJsonPath = path.resolve(process.cwd(), 'src/pages.json')
  const outputPath = path.resolve(process.cwd(), 'pages.d.ts')

  // 生成类型定义函数
  const generateTypings = () => {
    try {
      if (!fs.existsSync(pagesJsonPath)) {
        consola.warn(`pages.json not found at ${pagesJsonPath}`)
        return
      }

      const pagesJson = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf-8'))

      const pagesPath = getPagesPath(pagesJson)

      const typeContent = `// 根据 pages.json 自动生成
// 不要编辑此文件

import 'sard-uniapp'

declare module 'sard-uniapp' {
  interface PagesPath {
    path: ${pagesPath.map((path) => `'${path}'`).join('|')}
  }
}
`

      // 确保目录存在
      const dir = path.dirname(outputPath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.writeFileSync(outputPath, typeContent)
      console.log(`Types generated at ${outputPath}`)
    } catch (error) {
      console.error('Error generating pages typings:', error)
    }
  }

  return {
    name: 'vite-plugin-pages-typings',

    configResolved(resolvedConfig) {
      // 开发模式下监听文件变化
      if (resolvedConfig.command === 'serve') {
        const watcher = chokidar.watch(pagesJsonPath)
        watcher.on('change', () => {
          generateTypings()
        })
      }
    },

    buildStart() {
      generateTypings()
    },
  } as PluginOption
}
