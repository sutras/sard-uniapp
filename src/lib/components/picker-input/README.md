---
nav: 组件
title: PickerInput
subtitle: 选择器输入框
group: 表单组件
---

## 介绍

组合了选择器、弹出框、输入框组件，实现了便捷快速的选择功能。

## 引入

```ts
import PickerInput from 'sard-uniapp/components/picker-input/picker-input.vue'
```

## 代码演示

### 基础使用

选择器输入框组件接收选择器组件相同的属性，另外可以通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹选择器的弹出框。

@code('${DEMO_PATH}/picker-input/demo/Basic.vue')

## API

### PickerInputProps

继承 [`PickerProps`](./picker#PickerProps) 并有以下额外属性：

| 属性                            | 描述                                    | 类型       | 默认值 |
| ------------------------------- | --------------------------------------- | ---------- | ------ |
| root-class                      | 弹出式输入框根元素类名                  | string     | -      |
| root-style                      | 弹出式输入框根元素样式                  | StyleValue | -      |
| popout-class <sup>1.14.2+</sup> | 弹窗框根元素类名                        | string     | -      |
| popout-style <sup>1.14.2+</sup> | 弹窗框根元素样式                        | StyleValue | -      |
| disabled                        | 禁用状态                                | boolean    | false  |
| readonly                        | 只读状态                                | boolean    | false  |
| loading                         | 加载状态                                | boolean    | false  |
| clearable                       | 是否显示清空按钮                        | boolean    | false  |
| placeholder                     | 输入框占位符内容                        | string     | -      |
| visible (v-model)               | 是否显示弹出框                          | boolean    | -      |
| title                           | 弹出框标题，不设置则取 `placeholder` 值 | string     | -      |
| validate-event                  | 是否触发表单验证                        | boolean    | true   |

### PickerInputEmits

| 事件                     | 描述                       | 类型                       |
| ------------------------ | -------------------------- | -------------------------- |
| update:model-value       | 选择器输入组件值改变时触发 | (value: any) => void       |
| change <sup>1.9.2+</sup> | 选择器输入组件值改变时触发 | (value: any) => void       |
| update:visible           | 弹出框显隐时触发           | (visible: boolean) => void |
