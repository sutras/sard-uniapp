import consola from 'consola'
import inquirer from 'inquirer'
import { camelCase, kebabCase, upperFirst } from 'lodash-es'
import path from 'node:path'
import {
  createComponentCommon,
  createComponentIndex,
  createComponentIndexScss,
  createComponentVue,
  declareGlobalComponent,
  exportComponent,
  libDir,
  runSteps,
} from './utils'
import fs from 'node:fs/promises'

async function createSubComponent(
  compDir: string,
  kebabCaseName: string,
  camelCaseName: string,
  pascalCaseName: string,
) {
  await createComponentVue(
    compDir,
    kebabCaseName,
    camelCaseName,
    pascalCaseName,
  )

  await createComponentCommon(compDir, pascalCaseName)

  await createComponentIndexScss(compDir, kebabCaseName)

  await createComponentIndex(compDir, pascalCaseName)
}

async function newSubComponent() {
  const compForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'enName',
      message: '请输入新增的组件英文名',
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

  const kebabCaseName = kebabCase(compForm.enName)
  const camelCaseName = camelCase(compForm.enName)
  const pascalCaseName = upperFirst(camelCaseName)

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
        createSubComponent(
          compDir,
          kebabCaseName,
          camelCaseName,
          pascalCaseName,
        ),
    ],
    ['导出组件模块', () => exportComponent(kebabCaseName)],
    [
      '声明全局组件',
      () => declareGlobalComponent(kebabCaseName, pascalCaseName),
    ],
  ])

  consola.success('成功新增组件')
}

newSubComponent()
