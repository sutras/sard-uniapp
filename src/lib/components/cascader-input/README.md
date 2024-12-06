---
nav: 组件
title: CascaderInput
subtitle: 级联输入框
group: 表单组件
---

## 介绍

组合了级联选择、弹出框、输入框组件，实现了便捷快速的级联选择功能。

## 引入

```ts
import CascaderInput from 'sard-uniapp/components/cascader-input/cascader-input.vue'
```

## 代码演示

### 基础使用

级联输入框组件接收级联选择组件相同的属性，另外可以通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹级联选择的弹出框。

@code('${DEMO_PATH}/cascader-input/demo/Basic.vue')

## API

### CascaderInputProps

继承 [`CascaderProps`](./#/components/cascader#CascaderProps) 并有以下额外属性：

| 属性              | 描述                                     | 类型    | 默认值 |
| ----------------- | ---------------------------------------- | ------- | ------ |
| disabled          | 禁用状态                                 | boolean | false  |
| readonly          | 只读状态                                 | boolean | false  |
| loading           | 加载状态                                 | boolean | false  |
| clearable         | 是否显示清空按钮                         | boolean | false  |
| placeholder       | 输入框占位符内容                         | string  | -      |
| visible (v-model) | 是否显示弹出框                           | boolean | -      |
| title             | 弹出框标题，不设置则取 `placeholder` 值  | string  | -      |
| show-confirm      | 是否显示确定按钮，隐藏按钮可用于快捷选择 | boolean | false  |
| validate-event    | 是否触发表单验证                         | boolean | true   |

### CascaderInputSlots

| 插槽 | 描述                       | 属性                 |
| ---- | -------------------------- | -------------------- |
| top  | 自定义级联组件面板上方内容 | { tabIndex: number } |

### CascaderInputEmits

| 事件               | 描述                     | 类型                                                                 |
| ------------------ | ------------------------ | -------------------------------------------------------------------- |
| update:model-value | 级联输入组件值改变时触发 | (value: string \| number, selectedOptions: CascaderOption[]) => void |
| update:visible     | 弹出框显隐时触发         | (visible: boolean) => void                                           |
| select             | 选择级联选择某一项时触发 | (option: CascaderOption, tabIndex: number) => void                   |
