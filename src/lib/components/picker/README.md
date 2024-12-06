---
nav: 组件
title: Picker
subtitle: 选择器
group: 表单组件
---

## 介绍

一个或多个可滚动列表选择器。

## 引入

```ts
import Picker from 'sard-uniapp/components/picker/picker.vue'
```

## 代码演示

### 基础使用

通过 `v-model` 绑定当前值，通过 `columns` 配置选项数据。

@code('${DEMO_PATH}/picker/demo/Basic.vue')

### 对象类型

列的每一项可以为一个对象，使用 `optionKeys` 属性可以指定对象中哪个属性值为选中的值，哪个属性值为要显示的标签。

@code('${DEMO_PATH}/picker/demo/ObjectOption.vue')

### 多列

当 `columns` 属性值为一个二维数组时会显示为多列。

@code('${DEMO_PATH}/picker/demo/Multiple.vue')

### 对象类型多列

`columns` 属性值为对象类型的二维数组。

@code('${DEMO_PATH}/picker/demo/ObjectMultiple.vue')

### 级联选择

当 `columns` 第一个元素为对象且其 `children` 属性值为数组时会被当作级联选择。

@code('${DEMO_PATH}/picker/demo/Cascaded.vue')

## API

### PickerProps

| 属性             | 描述                                               | 类型                               | 默认值                                                 |
| ---------------- | -------------------------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| root-class       | 组件根元素类名                                     | string                             | -                                                      |
| root-style       | 组件根元素样式                                     | StyleValue                         | -                                                      |
| columns          | 配置每一列的数据                                   | PickerOption[] \| PickerOption[][] | []                                                     |
| option-keys      | 自定义 `columns` 结构中的字段                      | PickerOptionKeys                   | {label: 'label', value: 'value', children: 'children'} |
| model-value      | 选中项的值                                         | any                                | -                                                      |
| immediate-change | 是否在手指松开时立即触发 `update:model-value` 事件 | boolean                            | false                                                  |

### PickerEmits

| 事件               | 描述                 | 类型                                                                     |
| ------------------ | -------------------- | ------------------------------------------------------------------------ |
| update:model-value | 选中的选项改变时触发 | (value: any, selectedOptions: PickerOption[], indexes: number[]) => void |

### PickerOption

```tsx
type PickerOption =
  | {
      [key: PropertyKey]: any
    }
  | number
  | string
```

### PickerOptionKeys

```tsx
interface PickerOptionKeys {
  label?: string
  value?: string
  children?: string
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
