# Accordion 手风琴

## 介绍

通过折叠收纳内容，允许同时展开一个或多个。

## 引入

```ts
import Accordion from '@sard/uniapp/dist/accordion/accordion.vue'
import AccordionItem from '@sard/uniapp/dist/accordion-item/accordion-item.vue'
```

## 代码演示

### 基础使用

为手风琴每一个面板添加一个 `name` 属性，使用 `v-model` 绑定展开的面板。

@code('${DEMO_PATH}/accordion/demo/Basic.vue')

### 展开多个

设置 `multiple` 属性可以同时展开多个面板，此时 `v-model` 要绑定一个数组。

@code('${DEMO_PATH}/accordion/demo/Multiple.vue')

### 禁用

使用 `disabled` 属性可以禁用指定单个面板。

@code('${DEMO_PATH}/accordion/demo/Disabled.vue')

## API

### AccordionProps

| 属性        | 描述                   | 类型                                     | 默认值 |
| ----------- | ---------------------- | ---------------------------------------- | ------ |
| root-class  | 组件根元素类名         | string                                   | -      |
| root-style  | 组件根元素样式         | StyleValue                               | -      |
| model-value | 当前展开面板的 `name`  | string \| number \| (string \| number)[] | -      |
| multiple    | 是否可同时展开多个面板 | boolean                                  | false  |

### AccordionSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### AccordionEmits

| 事件               | 描述           | 类型                                                      |
| ------------------ | -------------- | --------------------------------------------------------- |
| update:model-value | 切换面板时触发 | (value: string \| number \| (string \| number)[]) => void |

### AccordionItemProps

| 属性       | 描述           | 类型             | 默认值 |
| ---------- | -------------- | ---------------- | ------ |
| root-class | 组件根元素类名 | string           | -      |
| root-style | 组件根元素样式 | StyleValue       | -      |
| title      | 面板标题       | string           | -      |
| value      | 面板的值       | string           | -      |
| name       | 面板的唯一标识 | string \| number | -      |
| disabled   | 禁用面板       | boolean          | false  |

### AccordionItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### AccordionItemEmits

| 事件  | 描述               | 类型                 |
| ----- | ------------------ | -------------------- |
| click | 点击面板头部时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
