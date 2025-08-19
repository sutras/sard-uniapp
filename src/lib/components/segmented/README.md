---
nav: 组件
title: Segmented
subtitle: 分段控制器
group: 表单组件
version: 1.24+
---

## 介绍

用于展示多个选项并允许用户选择其中单个选项。

## 引入

```ts
import Segmented from 'sard-uniapp/components/segmented/segmented.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `options` 定义选项内容。

@code('${DEMO_PATH}/segmented/demo/Basic.vue')

### 尺寸

通过 `size` 属性来定义尺寸大小。

@code('${DEMO_PATH}/segmented/demo/Size.vue')

### 胶囊形状

使用 `shape="round"` 属性可定义胶囊形状。

@code('${DEMO_PATH}/segmented/demo/Shape.vue')

### 设置图标

选项的 `icon` 属性可定义放置在 `label` 左边的图标。

@code('${DEMO_PATH}/segmented/demo/Icon.vue')

### 只设置图标

可以不配置 `label` 而只配置 `icon`。

@code('${DEMO_PATH}/segmented/demo/OnlyIcon.vue')

### 垂直方向

设置 `direction="vertical"` 属性可垂直排列分段器。

@code('${DEMO_PATH}/segmented/demo/Direction.vue')

### 禁用

可在 `segmented` 上设置 `disabled` 禁用所有选项，或者在选项上设置 `disabled` 禁用单个选项。

如果置于表单组件中，也受表单组件 `disabled` 属性的影响。

@code('${DEMO_PATH}/segmented/demo/Disabled.vue')

### 自定义内容

如果需要自定义内容，可使用 `segmented-item` 组件，需自定义循环和传递 `value` 属性。`options` 属性也需要传递，以便获取当前值的下标。

@code('${DEMO_PATH}/segmented/demo/Custom.vue')

## API

### SegmentedProps

| 属性           | 描述                                  | 类型                           | 默认值                           |
| -------------- | ------------------------------------- | ------------------------------ | -------------------------------- |
| root-class     | 组件根元素类名                        | string                         | -                                |
| root-style     | 组件根元素样式                        | StyleValue                     | -                                |
| model-value    | 绑定值                                | any                            | -                                |
| disabled       | 是否禁用                              | boolean                        | false                            |
| readonly       | 是否只读                              | boolean                        | false                            |
| size           | 组件大小                              | 'small' \| 'middle' \| 'large' | 'middle'                         |
| direction      | 展示的方向                            | 'horizontal' \| 'vertical'     | 'horizontal'                     |
| shape          | 形状                                  | 'square' \| 'round'            | 'square'                         |
| options        | 选项的数据                            | SegmentedOption[]              | -                                |
| option-keys    | 自定义 options 的 label、value 的字段 | SegmentedOptionKeys            | {label: 'label', value: 'value'} |
| validate-event | 是否触发表单验证                      | boolean                        | true                             |

### SegmentedOption

```ts
type SegmentedOption =
  | {
      [key: PropertyKey]: any
    }
  | string
  | number
  | boolean
```

### SegmentedOptionKeys

```ts
export interface SegmentedOptionKeys {
  label?: string
  value?: string
}
```

### SegmentedSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SegmentedEmits

| 事件               | 描述               | 类型                 |
| ------------------ | ------------------ | -------------------- |
| update:model-value | 当所选值更改时触发 | (value: any) => void |
| change             | 当所选值更改时触发 | (value: any) => void |

### SegmentedItemProps

| 属性        | 描述           | 类型                        | 默认值 |
| ----------- | -------------- | --------------------------- | ------ |
| root-class  | 组件根元素类名 | string                      | -      |
| root-style  | 组件根元素样式 | StyleValue                  | -      |
| label       | 展示文本       | string \| number            | -      |
| value       | 用于绑定的值   | string \| number \| boolean | -      |
| icon        | 图标           | string                      | -      |
| icon-family | 图标字体       | string                      | -      |
| icon-size   | 图标大小       | string                      | -      |
| disabled    | 禁用状态       | boolean                     | false  |
| readonly    | 只读状态       | boolean                     | false  |

### SegmentedItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
