import consola from 'consola'
import path from 'node:path'
import fs from 'node:fs/promises'
import fse from 'fs-extra'

export const libDir = path.resolve(process.cwd(), 'src/lib')
const srcDir = path.resolve(process.cwd(), 'src')

export async function replaceFileContent(
  filePath: string,
  replacement: (content: string) => string,
) {
  let content = await fs.readFile(filePath, 'utf8')
  content = replacement(content)
  await fs.writeFile(filePath, content)
}

export function logNewFile(file: string) {
  consola.log('[创建文件] ', file)
  return file
}

// *.vue
export async function createComponentVue(
  compDir: string,
  kebabCaseName: string,
  camelCaseName: string,
  pascalCaseName: string,
) {
  await fse.outputFile(
    logNewFile(path.resolve(compDir, `${kebabCaseName}.vue`)),
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
  default${pascalCaseName}Props,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<${pascalCaseName}Props>(), default${pascalCaseName}Props)

defineSlots<${pascalCaseName}Slots>()

defineEmits<${pascalCaseName}Emits>()

const bem = createBem('${kebabCaseName}')

// main

// others
defineExpose<${pascalCaseName}Expose>({})

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
}

// common.ts
export async function createComponentCommon(
  compDir: string,
  pascalCaseName: string,
  camelCaseName: string,
) {
  await fse.outputFile(
    logNewFile(path.resolve(compDir, `common.ts`)),
    `import { type StyleValue } from 'vue'

import { defaultConfig } from '../config'

export interface ${pascalCaseName}Props {
  rootStyle?: StyleValue
  rootClass?: string
}

export const default${pascalCaseName}Props = defaultConfig.${camelCaseName}

export interface ${pascalCaseName}Slots {
  default?(props: Record<string, never>): any
}

export interface ${pascalCaseName}Emits {}

export interface ${pascalCaseName}Expose {}
`,
  )
}

// index.scss
export async function createComponentIndexScss(
  compDir: string,
  kebabCaseName: string,
) {
  await fse.outputFile(
    logNewFile(path.resolve(compDir, `index.scss`)),
    `@use '../style/base' as *;

@include bem(${kebabCaseName}) {
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
}

// index.ts
export async function createComponentIndex(
  compDir: string,
  pascalCaseName: string,
) {
  await fse.outputFile(
    logNewFile(path.resolve(compDir, `index.ts`)),
    `export type {
  ${pascalCaseName}Props,
  ${pascalCaseName}Slots,
  ${pascalCaseName}Emits,
  ${pascalCaseName}Expose,
} from './common'
`,
  )
}

// README.md
export async function createComponentReadme(
  compDir: string,
  kebabCaseName: string,
  pascalCaseName: string,
  cnName: string,
  groupCnName: string,
) {
  await fse.outputFile(
    logNewFile(path.resolve(compDir, `README.md`)),
    `---
nav: 组件
title: ${pascalCaseName}
subtitle: ${cnName}
group: ${groupCnName}
---

## 介绍

${pascalCaseName}

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
|       |            |                      |

### ${pascalCaseName}Expose

| 属性  | 描述         | 类型       |
| ----- | ------------ | ---------- |
|       |              |            |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
`,
  )
}

// variables.scss
export async function createComponentVariables(compDir: string) {
  await fse.outputFile(
    logNewFile(path.resolve(compDir, `variables.scss`)),
    `// #variables
page,
.sar-portal {}
// #endvariables
`,
  )
}

export async function createDemo(
  kebabCaseName: string,
  pascalCaseName: string,
  cnName: string,
) {
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
    logNewFile(path.resolve(demoDir, `index.vue`)),
    `<template>
  <doc-page title="${pascalCaseName} ${cnName}">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
</script>
`,
  )

  // Basic.vue
  await fse.outputFile(
    logNewFile(path.resolve(demoDir, `demo/Basic.vue`)),
    `<template>
  <sar-${kebabCaseName}></sar-${kebabCaseName}>
</template>
`,
  )
}

export async function exportCssVariable(kebabCaseName: string) {
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

export async function exportComponent(kebabCaseName: string) {
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

export async function declareGlobalComponent(
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

export async function addDemoRoute(kebabCaseName: string) {
  await replaceFileContent(path.resolve(srcDir, 'pages.json'), (content) => {
    const obj = JSON.parse(content)
    const pages = obj.subPackages[0].pages
    if (pages.find((item: any) => item.path.includes(`${kebabCaseName}/`))) {
      consola.warn(`已存在同名组件: ${kebabCaseName}`)
    } else {
      pages.push({
        path: `${kebabCaseName}/index`,
      })
      pages.sort((a: any, b: any) => {
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

export async function addDemoMenu(
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
      return JSON.stringify(obj, null, 2) + '\n'
    },
  )
}

export async function runSteps(
  steps: [stepName: string, step: () => Promise<void>][],
) {
  for (const [i, [stepName, step]] of steps.entries()) {
    consola.info(`当前步骤：${i + 1}/${steps.length} ${stepName}`)
    await step()
  }
}
