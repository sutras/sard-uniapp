---
title: ColorPickerPopout
subtitle: 颜色选择器弹出框
group: 表单组件
version: 1.29+
---

## 介绍

组合了颜色选择器、弹出框组件，实现了便捷快速的颜色选择功能。

## 引入

```ts
import ColorPickerPopout from 'sard-uniapp/components/color-picker-popout/color-picker-popout.vue'
```

## 代码演示

### 基础使用

<<< @demo/color-picker-popout/demo/Basic.vue

## API

### ColorPickerPopoutProps

继承 [`ColorPickerProps`](./color-picker#ColorPickerProps) 并有以下额外属性：

| 属性              | 描述                             | 类型       | 默认值 |
| ----------------- | -------------------------------- | ---------- | ------ |
| popout-class      | 弹窗框根元素类名                 | string     | -      |
| popout-style      | 弹窗框根元素样式                 | StyleValue | -      |
| visible (v-model) | 是否显示弹出框                   | boolean    | -      |
| title             | 弹出框标题                       | string     | -      |
| validate-event    | 是否触发表单验证                 | boolean    | true   |
| resettable        | 关闭弹出框后，是否可复位弹出框值 | boolean    | false  |

### ColorPickerPopoutEmits

| 事件               | 描述                 | 类型                         |
| ------------------ | -------------------- | ---------------------------- |
| update:visible     | 弹出层显隐变化时触发 | `(visible: boolean) => void` |
| update:model-value | 确认选择后触发       | `(value: string) => void`    |
| change             | 确认选择后触发       | `(value: string) => void`    |
| confirm            | 点击确认按钮时触发   | `() => void`                 |
