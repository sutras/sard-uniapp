---
nav: 组件
title: PickerPopout
subtitle: 选择器弹出框
group: 表单组件
version: 1.16+
---

## 介绍

组合了选择器、弹出框组件，实现了便捷快速的选择功能。

## 引入

```ts
import PickerPopout from 'sard-uniapp/components/picker-popout/picker-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

@code('${DEMO_PATH}/picker-popout/demo/Basic.vue')

## API

### PickerPopoutProps

继承 [`PickerProps`](./picker#PickerProps) 并有以下额外属性：

| 属性              | 描述             | 类型       | 默认值 |
| ----------------- | ---------------- | ---------- | ------ |
| popout-class      | 弹窗框根元素类名 | string     | -      |
| popout-style      | 弹窗框根元素样式 | StyleValue | -      |
| visible (v-model) | 是否显示弹出框   | boolean    | -      |
| title             | 弹出框标题       | string     | -      |
| validate-event    | 是否触发表单验证 | boolean    | true   |

### PickerPopoutSlots

继承 [`PickerSlots`](./picker#PickerSlots)

### PickerPopoutEmits

| 事件                               | 描述                        | 类型                               |
| ---------------------------------- | --------------------------- | ---------------------------------- |
| update:model-value                 | 选择器输入组件值改变时触发  | (value: any) => void               |
| change                             | 选择器输入组件值改变时触发  | (value: any) => void               |
| update:visible                     | 弹出框显隐时触发            | (visible: boolean) => void         |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发          | () => void                         |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发          | () => void                         |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发          | () => void                         |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发          | () => void                         |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发          | () => void                         |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发          | () => void                         |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发          | () => void                         |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发          | () => void                         |
