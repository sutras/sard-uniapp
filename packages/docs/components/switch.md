---
title: Switch
subtitle: 开关
group: 表单组件
---

## 介绍

用于打开/关闭两种状态间的切换。

## 引入

```js
import Switch from 'sard-uniapp/components/switch/switch.vue'
```

## 代码演示

### 基础使用

通过 `v-model` 绑定开关的状态，`true` 表示开，`false` 表示关。

<<< @demo/switch/demo/Basic.vue

### 自定义尺寸

使用 `size` 属性设置开关尺寸。

<<< @demo/switch/demo/Size.vue

### 自定义颜色

使用 `checkedColor` 属性设置打开时的颜色，使用 `uncheckedColor` 属性设置关闭时的颜色。

<<< @demo/switch/demo/Color.vue

### 不同状态的值

可以设置 `checkedValue` 和 `uncheckedValue` 属性代替默认的 `true` 和 `false`。

<<< @demo/switch/demo/Value.vue

### 只读和禁用

只读或禁用时不可操作。

<<< @demo/switch/demo/DisabledReadOnly.vue

### 加载状态

当提供 `beforeUpdate` 函数，会在 `fulfilled` 状态后才切换，期间显示加载状态。

<<< @demo/switch/demo/Loading.vue

### 带有文字 <sup>1.30+</sup>

可以使用 `checked-text` 和 `unchecked-text` 属性设置开关内的文字。

<<< @demo/switch/demo/Text.vue

### 使用插槽自定义内容 <sup>1.30+</sup>

如果需要在开关内部展示复杂的内容，也可以使用 `checked-text` 和 `unchecked-text` 插槽。

<<< @demo/switch/demo/Slots.vue

## API

### SwitchProps

| 属性                            | 描述               | 类型                            | 默认值 |
| ------------------------------- | ------------------ | ------------------------------- | ------ |
| root-class                      | 组件根元素类名     | string                          | -      |
| root-style                      | 组件根元素样式     | StyleValue                      | -      |
| model-value (v-model)           | 开关状态           | any                             | -      |
| disabled                        | 禁用状态           | boolean                         | false  |
| readonly                        | 只读状态           | boolean                         | false  |
| loading (v-model)               | 加载状态           | boolean                         | -      |
| size                            | 开关大小           | string                          | -      |
| checked-color                   | 打开时的颜色       | string                          | -      |
| unchecked-color                 | 关闭时的颜色       | string                          | -      |
| checked-value                   | 打开时的值         | any                             | true   |
| unchecked-value                 | 关闭时的值         | any                             | false  |
| checked-text <sup>1.30+</sup>   | 打开时的展示的文字 | string                          | -      |
| unchecked-text <sup>1.30+</sup> | 关闭时的展示的文字 | string                          | -      |
| before-update                   | 用于异步切换       | `(value: any) => Promise\<any>` | -      |
| validate-event                  | 是否触发表单验证   | boolean                         | true   |

### SwitchSlots <sup>1.30+</sup>

| 插槽           | 描述               | 属性 |
| -------------- | ------------------ | ---- |
| checked-text   | 自定义打开时的内容 | -    |
| unchecked-text | 自定义关闭时的内容 | -    |

### SwitchEmits

| 事件                     | 描述                                   | 类型                         |
| ------------------------ | -------------------------------------- | ---------------------------- |
| click                    | 点击按钮时触发，加载和禁用状态不会触发 | `(event: any) => void`       |
| update:model-value       | 开关状态切换时触发                     | `(value: any) => void`       |
| change <sup>1.9.2+</sup> | 开关状态切换时触发                     | `(value: any) => void`       |
| update:loading           | 加载状态切换时触发                     | `(loading: boolean) => void` |

## 主题定制

### CSS 变量

<<< @comp/switch/variables.scss#variables
