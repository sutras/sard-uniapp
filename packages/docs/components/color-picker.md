---
title: ColorPicker
subtitle: 颜色选择器
group: 表单组件
version: 1.29+
---

## 介绍

用于颜色选择，基础交互为饱和度-明度面板搭配色相滑块；开启 `show-alpha` 后可继续调节透明度。

## 引入

```ts
import ColorPicker from 'sard-uniapp/components/color-picker/color-picker.vue'
```

## 代码演示

### 基础用法

使用 `v-model` 绑定当前选中的颜色。

<<< @demo/color-picker/demo/Basic.vue

### 选择透明度

设置 `show-alpha` 属性启用透明度选择。

<<< @demo/color-picker/demo/Alpha.vue

### 预定义颜色

设置 `show-presets` 属性展示预定义颜色。

<<< @demo/color-picker/demo/Presets.vue

### 自定义预定义颜色

使用 `presets` 属性设置预定义颜色。

<<< @demo/color-picker/demo/CustomPresets.vue

### 颜色的格式

可以使用 `format` 属性设置 `hex`、`rgb`、`hsl` 三种格式。

<<< @demo/color-picker/demo/Formats.vue

### 允许切换格式

设置 `show-format` 属性可以让用户自行设置格式。

<<< @demo/color-picker/demo/Formats.vue

## API

### ColorPickerProps

| 属性         | 描述                 | 类型                    | 默认值    |
| ------------ | -------------------- | ----------------------- | --------- |
| root-class   | 组件根元素类名       | string                  | -         |
| root-style   | 组件根元素样式       | StyleValue              | -         |
| model-value  | 当前颜色值           | string                  | `#1989FA` |
| show-alpha   | 是否启用透明度选择   | boolean                 | false     |
| format       | 输出颜色格式         | `hex` \| `rgb` \| `hsl` | `hex`     |
| show-format  | 是否启用格式选择     | boolean                 | false     |
| presets      | 预定义颜色列表       | string[]                | -         |
| show-presets | 是否启用预设颜色选择 | boolean                 | false     |
| disabled     | 是否禁用             | boolean                 | false     |
| readonly     | 是否只读             | boolean                 | false     |

### ColorPickerEmits

| 事件               | 描述               | 类型                            |
| ------------------ | ------------------ | ------------------------------- |
| update:model-value | 颜色值变化时触发   | `(value: string) => void`       |
| change             | 颜色值变化时触发   | `(value: string) => void`       |
| update:format      | 切换颜色格式时触发 | `(format: ColorFormat) => void` |
| format-change      | 切换颜色格式时触发 | `(format: ColorFormat) => void` |

### ColorFormat

```ts
type ColorFormat = 'hex' | 'rgb' | 'hsl'
```

## 主题定制

### CSS 变量

<<< @comp/color-picker/variables.scss#variables
