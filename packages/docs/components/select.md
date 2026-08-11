---
title: Select
subtitle: 列表选择
group: 表单组件
version: 1.27+
---

## 介绍

从列表中选择一个或多个选项。

## 引入

```js
import Select from 'sard-uniapp/components/select/select.vue'
import SelectOption from 'sard-uniapp/components/select-option/select-option.vue'
import SelectOptionGroup from 'sard-uniapp/components/select-option-group/select-option-group.vue'
```

## 代码演示

### 基础使用

`v-model` 绑定当前被选中的 `SelectOption` 的 `value` 属性值。

<<< @demo/select/demo/Basic.vue

更多案例，请参考 [SelectPopout 组件](./select-popout)。

## API

### SelectProps

| 属性               | 描述                                              | 类型                                                                     | 默认值                                                   |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| root-class         | 组件根元素类名                                    | string                                                                   | -                                                        |
| root-style         | 组件根元素样式                                    | StyleValue                                                               | -                                                        |
| model-value        | 当前绑定的值                                      | any                                                                      | -                                                        |
| multiple           | 是否允许多选                                      | boolean                                                                  | false                                                    |
| multiple-limit     | 多选时允许最多选择的个数，为0则不限制             | number                                                                   | 0                                                        |
| filterable         | 是否允许筛选                                      | boolean                                                                  | false                                                    |
| filter-placeholder | 筛选输入框的占位文案                              | string                                                                   | -                                                        |
| filter-method      | 允许筛选时的回调                                  | `(query: string) => void`                                                | -                                                        |
| remote             | 是否允许远程加载数据                              | boolean                                                                  | false                                                    |
| remote-method      | 允许远程加载数据时的回调                          | `(query: string, page: number, isRefresh: boolean) => Promise\<boolean>` | -                                                        |
| threshold          | 触发远程加载回调的阈值，单位ms                    | number                                                                   | 500                                                      |
| show-toolbar       | 多选时，是否显示工具栏                            | boolean                                                                  | false                                                    |
| options            | 选项的数据                                        | Record<string, any>[]                                                    | []                                                       |
| option-keys        | 自定义 `options` 中的字段                         | OptionKeys                                                               | `{label: 'label', value: 'value', children: 'children'}` |
| value-key          | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | OptionKeys                                                               | `{label: 'label', value: 'value', children: 'children'}` |

### OptionKeys

```tsx
interface OptionKeys {
  label?: string
  value?: string
  children?: string
}
```

### SelectSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SelectEmits

| 事件               | 描述                     | 类型                   |
| ------------------ | ------------------------ | ---------------------- |
| update:model-value | 列表选择组件值改变时触发 | `(value: any) => void` |
| change             | 列表选择组件值改变时触发 | `(value: any) => void` |

### SelectOptionGroupProps

| 属性       | 描述                   | 类型             | 默认值 |
| ---------- | ---------------------- | ---------------- | ------ |
| root-class | 组件根元素类名         | string           | -      |
| root-style | 组件根元素样式         | StyleValue       | -      |
| label      | 选项组的标签           | string \| number | -      |
| disabled   | 是否禁用组内所有的选项 | boolean          | false  |

### SelectOptionGroupSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SelectOptionProps

| 属性       | 描述             | 类型                                  | 默认值 |
| ---------- | ---------------- | ------------------------------------- | ------ |
| root-class | 组件根元素类名   | string                                | -      |
| root-style | 组件根元素样式   | StyleValue                            | -      |
| label      | 选项的标签       | string \| number                      | -      |
| value      | 选项的值         | string \| number \| boolean \| object | -      |
| disabled   | 是否禁用该选项   | boolean                               | false  |
| plain      | 是否移除默认样式 | boolean                               | false  |

### SelectOptionSlots

| 插槽    | 描述           | 属性                                       |
| ------- | -------------- | ------------------------------------------ |
| default | 自定义默认内容 | `{ disabled: boolean; selected: boolean }` |
| label   | 自定义标签内容 | `{ disabled: boolean; selected: boolean }` |

### SelectOptionEmits

| 事件  | 描述           | 类型                   |
| ----- | -------------- | ---------------------- |
| click | 点击选项时触发 | `(event: any) => void` |

## 主题定制

### CSS 变量

<<< @comp/select/variables.scss#variables
