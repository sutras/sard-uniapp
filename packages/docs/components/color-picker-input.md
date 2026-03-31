---
title: ColorPickerInput
subtitle: 颜色选择器输入框
group: 表单组件
version: 1.29+
---

## 介绍

组合了颜色选择器、弹出框、输入框组件，实现了便捷快速的颜色选择功能。

## 引入

```ts
import ColorPickerInput from 'sard-uniapp/components/color-picker-input/color-picker-input.vue'
```

## 代码演示

### 基础使用

<<< @demo/color-picker-input/demo/Basic.vue

## API

### ColorPickerInputProps

继承 [`ColorPickerPopoutProps`](./color-picker-popout#ColorPickerPopoutProps) 并有以下额外属性：

| 属性           | 描述                   | 类型        | 默认值            |
| -------------- | ---------------------- | ----------- | ----------------- |
| root-class     | 弹出式输入框根元素类名 | string      | -                 |
| root-style     | 弹出式输入框根元素样式 | StyleValue  | -                 |
| disabled       | 禁用状态               | boolean     | false             |
| readonly       | 只读状态               | boolean     | false             |
| clearable      | 是否显示清空按钮       | boolean     | false             |
| placeholder    | 输入框占位符内容       | string      | -                 |
| value-on-clear | 设置点击清除按钮后的值 | `() => any` | `() => undefined` |
| arrow          | 自定义箭头图标名       | string      | 'caret-right'     |
| arrow-family   | 自定义箭头图标字体     | string      | 'sari'            |
| input-props    | 自定义输入框组件属性   | InputProps  | -                 |

### ColorPickerInputEmits

| 事件               | 描述                 | 类型                         |
| ------------------ | -------------------- | ---------------------------- |
| update:model-value | 颜色值变化时触发     | `(value: string) => void`    |
| change             | 颜色值变化时触发     | `(value: string) => void`    |
| update:visible     | 弹出层显隐变化时触发 | `(visible: boolean) => void` |
| confirm            | 点击确认按钮时触发   | `() => void`                 |
