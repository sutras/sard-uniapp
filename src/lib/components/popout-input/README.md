---
nav: 组件
title: PopoutInput
subtitle: 弹出式输入框
group: 表单组件
---

## 介绍

输入框组件，用于配合弹出框组件和表单控件一起使用。自定义了输入框样式。

## 引入

```ts
import PopoutInput from 'sard-uniapp/components/popout-input/popout-input.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定值， `click` 事件监听点击事件。

@code('${DEMO_PATH}/popout-input/demo/Basic.vue')

## API

### PopoutInputProps

| 属性        | 描述             | 类型       | 默认值 |
| ----------- | ---------------- | ---------- | ------ |
| root-class  | 组件根元素类名   | string     | -      |
| root-style  | 组件根元素样式   | StyleValue | -      |
| model-value | 输入框值         | string     | -      |
| placeholder | 输入框占位符内容 | string     | -      |
| disabled    | 禁用状态         | boolean    | false  |
| readonly    | 只读状态         | boolean    | false  |
| loading     | 加载状态         | boolean    | false  |
| clearable   | 是否显示清空按钮 | boolean    | false  |
| multiline   | 是否多行输入框   | boolean    | false  |

### PopoutInputEmits

| 事件                     | 描述                               | 类型                    |
| ------------------------ | ---------------------------------- | ----------------------- |
| click                    | 点击输入框时触发，只读和禁用不触发 | () => void              |
| update:model-value       | 输入框值改变时触发                 | (value: string) => void |
| change <sup>1.9.2+</sup> | 输入框值改变时触发                 | (value: string) => void |
| clear                    | 点击清除按钮时触发                 | () => void              |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
