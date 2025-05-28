---
nav: 组件
title: RadioInput
subtitle: 单选输入框
group: 表单组件
version: 1.3+
---

## 介绍

组合了单选弹出框、列表、输入框组件，实现了在弹出框中单选的功能。

## 引入

```ts
import RadioInput from 'sard-uniapp/components/radio-input/radio-input.vue'
```

## 代码演示

### 基础使用

通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本，
通过 `options` 属性设置可选项。

@code('${DEMO_PATH}/radio-input/demo/Basic.vue')

## API

### RadioInputProps

继承 [`RadioPopoutProps`](./radio-popout#RadioPopoutProps) 并有以下额外属性：

| 属性        | 描述                   | 类型       | 默认值 |
| ----------- | ---------------------- | ---------- | ------ |
| root-class  | 弹出式输入框根元素类名 | string     | -      |
| root-style  | 弹出式输入框根元素样式 | StyleValue | -      |
| clearable   | 是否显示清空按钮       | boolean    | false  |
| placeholder | 输入框占位符内容       | string     | -      |

### RadioInputEmits

继承 [`RadioPopoutEmits`](./radio-popout#RadioPopoutEmits)
