import inquirer from 'inquirer'
import consola from 'consola'
import path from 'node:path'
import fs from 'node:fs/promises'
import fse from 'fs-extra'
import { kebabCase, upperFirst, camelCase } from 'lodash-es'

const libDir = path.resolve(process.cwd(), 'src/lib')
const srcDir = path.resolve(process.cwd(), 'src')

async function replaceFileContent(
  filePath: string,
  replacement: (content: string) => string,
) {
  let content = await fs.readFile(filePath, 'utf8')
  content = replacement(content)
  await fs.writeFile(filePath, content)
}

async function createComponent(
  compDir: string,
  kebabCaseName: string,
  camelCaseName: string,
  pascalCaseName: string,
  cnName: string,
  groupCnName: string,
) {
  // *.vue
  await fse.outputFile(
    path.resolve(compDir, `${kebabCaseName}.vue`),
    `<template>
  <view :class="${camelCaseName}Class" :style="${camelCaseName}Style">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type ${pascalCaseName}Props,
  type ${pascalCaseName}Slots,
  type ${pascalCaseName}Emits,
  type ${pascalCaseName}Expose,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<${pascalCaseName}Props>(), {})

defineSlots<${pascalCaseName}Slots>()

defineEmits<${pascalCaseName}Emits>()

const bem = createBem('${camelCaseName}')

// main

defineExpose<${pascalCaseName}Expose>({
  reset: () => {
    void 0
  },
})

// others
const ${camelCaseName}Class = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const ${camelCaseName}Style = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
`,
  )

  // common.ts
  await fse.outputFile(
    path.resolve(compDir, `common.ts`),
    `import { type StyleValue } from 'vue'

export interface ${pascalCaseName}Props {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface ${pascalCaseName}Slots {
  default?(props: Record<string, never>): any
}

export interface ${pascalCaseName}Emits {
  (e: 'click', event: any): void
}

export interface ${pascalCaseName}Expose {
  reset: () => void
}
`,
  )

  // index.scss
  await fse.outputFile(
    path.resolve(compDir, `index.scss`),
    `@use '../style/base' as *;

@include bem(${camelCaseName}) {
  @include b() {
    @include universal;
  }

  @include e(element) {
    @include universal;

    @include m(modifier) {
    }
  }

  @include m(modifier) {
  }
}
`,
  )

  // index.ts
  await fse.outputFile(
    path.resolve(compDir, `index.ts`),
    `export type {
  ${pascalCaseName}Props,
  ${pascalCaseName}Slots,
  ${pascalCaseName}Emits,
  ${pascalCaseName}Expose,
} from './common'
`,
  )

  // README.md
  await fse.outputFile(
    path.resolve(compDir, `README.md`),
    `---
nav: 组件
title: ${pascalCaseName}
subtitle: ${cnName}
group: ${groupCnName}
---

## 介绍

${kebabCaseName}

## 引入

\`\`\`ts
import ${pascalCaseName} from 'sard-uniapp/components/${kebabCaseName}/${kebabCaseName}.vue'
\`\`\`

## 代码演示

### 基础使用

@code('\${DEMO_PATH}/${kebabCaseName}/demo/Basic.vue')

## API

### ${pascalCaseName}Props

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |

### ${pascalCaseName}Slots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ${pascalCaseName}Emits

| 事件  | 描述       | 类型                 |
| ----- | ---------- | -------------------- |
| click | 点击时触发 | (event: any) => void |

### ${pascalCaseName}Expose

| 属性  | 描述         | 类型       |
| ----- | ------------ | ---------- |
| reset | 重置滚动时长 | () => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
`,
  )

  // variables.scss
  await fse.outputFile(
    path.resolve(compDir, `variables.scss`),
    `// #variables
page {
  --sar-sidebar-bg: #fff;
}
// #endvariables
`,
  )
}

async function createDemo(kebabCaseName: string, camelCaseName: string) {
  const demoDir = path.resolve(srcDir, `pages/components/${kebabCaseName}`)

  try {
    await fs.access(demoDir)
    consola.error(`案例目录已存在: ${demoDir}`)
    process.exit(1)
  } catch {
    void 0
  }

  // index.vue
  await fse.outputFile(
    path.resolve(demoDir, `index.vue`),
    `<template>
  <doc-page>
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
</script>

<style lang="scss" scoped></style>
`,
  )

  // Basic.vue
  await fse.outputFile(
    path.resolve(demoDir, `demo/Basic.vue`),
    `<template>
  <sar-${camelCaseName}></sar-${camelCaseName}>
</template>
`,
  )
}

async function exportCssVariable(kebabCaseName: string) {
  await replaceFileContent(path.resolve(libDir, 'index.scss'), (content) => {
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
  })
}

async function exportComponent(kebabCaseName: string) {
  await replaceFileContent(path.resolve(libDir, 'index.ts'), (content) => {
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
  })
}

async function declareGlobalComponent(
  kebabCaseName: string,
  pascalCaseName: string,
) {
  await replaceFileContent(path.resolve(libDir, 'global.d.ts'), (content) => {
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
  })
}

async function addDemoRoute(
  kebabCaseName: string,
  pascalCaseName: string,
  cnName: string,
) {
  await replaceFileContent(path.resolve(srcDir, 'pages.json'), (content) => {
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
  })
}

async function addDemoMenu(
  groupCnName: string,
  kebabCaseName: string,
  pascalCaseName: string,
  cnName: string,
) {
  await replaceFileContent(
    path.resolve(srcDir, 'components/menu/menu.json'),
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

  const steps = [
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
    ['创建案例相关文件', () => createDemo(kebabCaseName, camelCaseName)],
    ['导出css变量模块', () => exportCssVariable(kebabCaseName)],
    ['导出组件模块', () => exportComponent(kebabCaseName)],
    [
      '声明全局组件',
      () => declareGlobalComponent(kebabCaseName, pascalCaseName),
    ],
    ['添加案例路由', () => addDemoRoute(kebabCaseName, pascalCaseName, cnName)],
    [
      '添加案例菜单',
      () => addDemoMenu(groupCnName, kebabCaseName, pascalCaseName, cnName),
    ],
  ] as const

  for (const [i, [stepName, step]] of steps.entries()) {
    consola.info(`当前步骤：${i + 1}/${steps.length} ${stepName}`)
    await step()
  }

  consola.success('成功新增组件')
}

newComponent()
