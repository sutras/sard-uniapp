import inquirer from 'inquirer'
import consola from 'consola'
import child_process from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs/promises'
import { kebabCase, upperFirst, camelCase } from 'lodash-es'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(path.dirname(import.meta.url))

async function copyComponentDir(destDir) {
  return new Promise((resolve, reject) => {
    const srcDir = path.resolve(
      __dirname,
      '..',
      'packages/sard-uniapp/src/components/_template',
    )

    child_process.exec(`cp -rf ${srcDir} ${destDir}`, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

async function copyDemoDir(kebabCaseName) {
  return new Promise((resolve, reject) => {
    const srcDir = path.resolve(
      __dirname,
      '..',
      'src/pages/components/_template',
    )
    const destDir = path.resolve(
      __dirname,
      '..',
      `src/pages/components/${kebabCaseName}`,
    )

    fs.access(destDir)
      .then(() => {
        consola.warn(`目录已存在: ${destDir}`)
        resolve()
      })
      .catch(() => {
        child_process.exec(`cp -rf ${srcDir} ${destDir}`, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
  })
}

async function replaceFileContent(filePath, replacement) {
  let content = await fs.readFile(filePath, 'utf8')
  content = replacement(content)
  await fs.writeFile(filePath, content)
}

async function replaceComponentName(
  compDir,
  kebabCaseName,
  camelCaseName,
  pascalCaseName,
  cnName,
) {
  await fs.rename(
    path.resolve(compDir, '_template.vue'),
    path.resolve(compDir, `${kebabCaseName}.vue`),
  )
  await replaceFileContent(
    path.resolve(compDir, `${kebabCaseName}.vue`),
    (content) => {
      return content
        .replaceAll('_template', camelCaseName)
        .replaceAll('_Template', pascalCaseName)
        .replace(/(?<=createBem\(').*?(?='\))/, kebabCaseName)
    },
  )
  await replaceFileContent(path.resolve(compDir, 'common.ts'), (content) => {
    return content.replaceAll('_Template', pascalCaseName)
  })
  await replaceFileContent(path.resolve(compDir, 'index.scss'), (content) => {
    return content.replaceAll('_template', kebabCaseName)
  })
  await replaceFileContent(path.resolve(compDir, 'index.ts'), (content) => {
    return content.replaceAll('_Template', pascalCaseName)
  })
  await replaceFileContent(path.resolve(compDir, 'README.md'), (content) => {
    return content
      .replaceAll('Template', pascalCaseName)
      .replaceAll('template', kebabCaseName)
      .replaceAll('默认模板', cnName)
  })
  await replaceFileContent(
    path.resolve(compDir, 'variables.scss'),
    (content) => {
      return content.replaceAll('template', kebabCaseName)
    },
  )
}

async function exportCssVariable(kebabCaseName) {
  await replaceFileContent(
    path.resolve(__dirname, '..', 'packages/sard-uniapp/src/index.scss'),
    (content) => {
      return (
        [
          ...new Set(
            content
              .trim()
              .split(/\n+/)
              .concat([
                `@use './components/${kebabCaseName}/variables.scss' as *;`,
              ])
              .sort(),
          ),
        ].join('\n') + '\n'
      )
    },
  )
}

async function exportComponent(kebabCaseName) {
  await replaceFileContent(
    path.resolve(__dirname, '..', 'packages/sard-uniapp/src/index.ts'),
    (content) => {
      return (
        [
          ...new Set(
            content
              .trim()
              .split(/\n+/)
              .concat([`export * from './components/${kebabCaseName}'`])
              .sort(),
          ),
        ].join('\n') + '\n'
      )
    },
  )
}

async function declareGlobalComponent(kebabCaseName, pascalCaseName) {
  await replaceFileContent(
    path.resolve(__dirname, '..', 'packages/sard-uniapp/src/global.d.ts'),
    (content) => {
      return (
        `declare module 'vue' {\n  export interface GlobalComponents {\n` +
        [
          ...new Set(
            content
              .split(/[{}]/)[2]
              .trim()
              .split('\n')
              .map((item) => item.trim())
              .concat([
                `Sar${pascalCaseName}: typeof import('./components/${kebabCaseName}/${kebabCaseName}.vue').default`,
              ])
              .sort()
              .map((item) => `    ${item}`),
          ),
        ].join('\n') +
        `\n  }\n}\n\nexport {}\n`
      )
    },
  )
}

async function addSiteMenuAndRoute(
  groupCnName,
  kebabCaseName,
  pascalCaseName,
  cnName,
) {
  await replaceFileContent(
    path.resolve(__dirname, '..', 'packages/sard-uniapp/sard.config.json'),
    (content) => {
      const obj = JSON.parse(content)
      const componentRoutes = obj.site.routes.find(
        (item) => item.title === '组件',
      )
      if (!componentRoutes) {
        consola.warn(`找不到“组件”`)
      } else {
        const group = componentRoutes.children.find(
          (item) => item.title === groupCnName,
        )
        if (!group) {
          consola.warn(`找不到菜单组: ${groupCnName}`)
        } else {
          let children = group.children
          if (!children) {
            children = group.children = []
          }
          if (children.find((item) => item.path === kebabCaseName)) {
            consola.warn(`已存在同名组件: ${kebabCaseName}`)
          } else {
            children.push({
              title: `${pascalCaseName} ${cnName}`,
              path: kebabCaseName,
              filePath: `src/components/${kebabCaseName}`,
            })
            children.sort((a, b) => {
              return a.path < b.path ? -1 : 1
            })
          }
        }
      }
      return JSON.stringify(obj, null, 2)
    },
  )
}

async function addDemoRoute(kebabCaseName, pascalCaseName, cnName) {
  await replaceFileContent(
    path.resolve(__dirname, '..', 'src/pages.json'),
    (content) => {
      const obj = JSON.parse(content)
      if (obj.pages.find((item) => item.path.includes(`/${kebabCaseName}/`))) {
        consola.warn(`已存在同名组件: ${kebabCaseName}`)
      } else {
        obj.pages.push({
          path: `pages/components/${kebabCaseName}/index`,
          style: {
            navigationBarTitleText: `${pascalCaseName} ${cnName}`,
          },
        })
        obj.pages.sort((a, b) => {
          const indexPath = 'pages/index/index'
          return a.path === indexPath
            ? -1
            : b.path === indexPath
            ? 1
            : a.path < b.path
            ? -1
            : 1
        })
      }
      return JSON.stringify(obj, null, 2)
    },
  )
}

async function addDemoMenu(groupCnName, kebabCaseName, pascalCaseName, cnName) {
  await replaceFileContent(
    path.resolve(__dirname, '..', 'src/components/menu/menu.json'),
    (content) => {
      const obj = JSON.parse(content)
      const group = obj.find((item) => item.title === groupCnName)
      if (!group) {
        consola.warn(`找不到菜单组: ${groupCnName}`)
      } else {
        let children = group.children
        if (!children) {
          children = group.children = []
        }
        if (children.find((item) => item.name === kebabCaseName)) {
          consola.warn(`已存在同名组件: ${kebabCaseName}`)
        } else {
          children.push({
            title: `${pascalCaseName} ${cnName}`,
            name: kebabCaseName,
          })
          children.sort((a, b) => (a.name < b.name ? -1 : 1))
        }
      }
      return JSON.stringify(obj, null, 2)
    },
  )
}

export async function addComponent() {
  const compForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'enName',
      message: '请输入新增的组件英文名',
    },
    {
      type: 'input',
      name: 'cnName',
      message: '请输入新增的组件中文名',
    },
    {
      type: 'input',
      name: 'groupCnName',
      message: '请输入中文组名',
    },
  ])

  for (const [name, value] of Object.entries(compForm)) {
    if (!value) {
      consola.error(`${name}不能为空`)
      process.exit(1)
    }
  }

  for (let k in compForm) {
    compForm[k] = compForm[k].trim()
  }

  consola.info(compForm)

  const confirmForm = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: '确定新增组件？',
      default: false,
    },
  ])

  if (!confirmForm.confirm) {
    consola.error('已取消新增组件')
    process.exit(1)
  }

  const groupCnName = compForm.groupCnName

  const kebabCaseName = kebabCase(compForm.enName)
  const camelCaseName = camelCase(compForm.enName)
  const pascalCaseName = upperFirst(camelCaseName)
  const cnName = compForm.cnName

  const compDir = path.resolve(
    __dirname,
    '..',
    `packages/sard-uniapp/src/components/${kebabCaseName}`,
  )

  try {
    await fs.access(compDir)
    consola.error(`目录已存在: ${compDir}`)
    process.exit(1)
  } catch {
    void 0
  }

  const steps = [
    ['拷贝组件目录', () => copyComponentDir(compDir)],
    ['拷贝案例目录', () => copyDemoDir(kebabCaseName)],
    [
      '替换组件名',
      () =>
        replaceComponentName(
          compDir,
          kebabCaseName,
          camelCaseName,
          pascalCaseName,
          cnName,
        ),
    ],
    ['导出css变量模块', () => exportCssVariable(kebabCaseName)],
    ['导出组件模块', () => exportComponent(kebabCaseName)],
    [
      '声明全局组件',
      () => declareGlobalComponent(kebabCaseName, pascalCaseName),
    ],
    [
      '添加文档站点菜单和路由',
      () =>
        addSiteMenuAndRoute(groupCnName, kebabCaseName, pascalCaseName, cnName),
    ],
    ['添加案例路由', () => addDemoRoute(kebabCaseName, pascalCaseName, cnName)],
    [
      '添加案例菜单',
      () => addDemoMenu(groupCnName, kebabCaseName, pascalCaseName, cnName),
    ],
  ]

  for (const [i, [stepName, step]] of steps.entries()) {
    consola.info(`当前步骤：${i + 1}/${steps.length} ${stepName}`)
    await step()
  }

  consola.success('成功新增组件')
}

addComponent()
