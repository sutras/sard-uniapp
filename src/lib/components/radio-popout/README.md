---
nav: 组件
title: RadioPopout
subtitle: 单选弹出框
group: 表单组件
version: 1.16+
---

## 介绍

组合了单选框组、列表、弹出框组件，实现了在弹出框中单选的功能。

## 引入

```ts
import RadioPopout from 'sard-uniapp/components/radio-popout/radio-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

@code('${DEMO_PATH}/radio-popout/demo/Basic.vue')

## API

### RadioPopoutProps

继承 [`RadioGroupProps`](./radio#RadioGroupProps) 并有以下额外属性：

| 属性              | 描述             | 类型       | 默认值 |
| ----------------- | ---------------- | ---------- | ------ |
| popout-class      | 弹窗框根元素类名 | string     | -      |
| popout-style      | 弹窗框根元素样式 | StyleValue | -      |
| visible (v-model) | 是否显示弹出框   | boolean    | -      |
| title             | 弹出框标题       | string     | -      |

### RadioPopoutEmits

| 事件               | 描述                     | 类型                              |
| ------------------ | ------------------------ | --------------------------------- |
| update:model-value | 单选输入组件值改变时触发 | (value: any \| undefined) => void |
| change             | 单选输入组件值改变时触发 | (value: any \| undefined) => void |
| update:visible     | 弹出框显隐时触发         | (visible: boolean) => void        |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
