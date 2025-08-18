import consola from 'consola'
import inquirer from 'inquirer'
import { camelCase, kebabCase, upperFirst } from 'lodash-es'
import path from 'node:path'
import {
  addDemoMenu,
  addDemoRoute,
  createComponentCommon,
  createComponentIndex,
  createComponentIndexScss,
  createComponentReadme,
  createComponentVariables,
  createComponentVue,
  createDemo,
  declareGlobalComponent,
  exportComponent,
  exportCssVariable,
  libDir,
  runSteps,
} from './utils'
import fs from 'node:fs/promises'

async function createComponent(
  compDir: string,
  kebabCaseName: string,
  camelCaseName: string,
  pascalCaseName: string,
  cnName: string,
  groupCnName: string,
) {
  await createComponentVue(
    compDir,
    kebabCaseName,
    camelCaseName,
    pascalCaseName,
  )

  await createComponentCommon(compDir, pascalCaseName, camelCaseName)

  await createComponentIndexScss(compDir, kebabCaseName)

  await createComponentIndex(compDir, pascalCaseName)

  await createComponentReadme(
    compDir,
    kebabCaseName,
    pascalCaseName,
    cnName,
    groupCnName,
  )

  await createComponentVariables(compDir)
}

async function newComponent() {
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

  for (const k in compForm) {
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

  const compDir = path.resolve(libDir, `components/${kebabCaseName}`)

  try {
    await fs.access(compDir)
    consola.error(`目录已存在: ${compDir}`)
    process.exit(1)
  } catch {
    void 0
  }

  await runSteps([
    [
      '创建组件源码等相关文件',
      () =>
        createComponent(
          compDir,
          kebabCaseName,
          camelCaseName,
          pascalCaseName,
          cnName,
          groupCnName,
        ),
    ],
    [
      '创建案例相关文件',
      () => createDemo(kebabCaseName, pascalCaseName, cnName),
    ],
    ['导出css变量模块', () => exportCssVariable(kebabCaseName)],
    ['导出组件模块', () => exportComponent(kebabCaseName)],
    [
      '声明全局组件',
      () => declareGlobalComponent(kebabCaseName, pascalCaseName),
    ],
    ['添加案例路由', () => addDemoRoute(kebabCaseName)],
    [
      '添加案例菜单',
      () => addDemoMenu(groupCnName, kebabCaseName, pascalCaseName, cnName),
    ],
  ])

  consola.success('成功新增组件')
}

newComponent()
