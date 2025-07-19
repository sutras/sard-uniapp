---
nav: 组件
title: DatetimeRangePickerPopout
subtitle: 日期时间范围弹出框
group: 表单组件
version: 1.16+
---

## 介绍

组合了日期时间范围、弹出框组件，实现了便捷快速的日期时间范围选择功能。

## 引入

```ts
import DatetimeRangePickerPopout from 'sard-uniapp/components/datetime-range-picker-popout/datetime-range-picker-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

@code('${DEMO_PATH}/datetime-range-picker-popout/demo/Basic.vue')

## API

### DatetimeRangePickerPopoutProps

继承 [`DatetimeRangePickerProps`](./datetime-range-picker#DatetimeRangePickerProps) 并有以下额外属性：

| 属性              | 描述             | 类型       | 默认值 |
| ----------------- | ---------------- | ---------- | ------ |
| popout-class      | 弹窗框根元素类名 | string     | -      |
| popout-style      | 弹窗框根元素样式 | StyleValue | -      |
| visible (v-model) | 是否显示弹出框   | boolean    | -      |
| title             | 弹出框标题       | string     | -      |
| validate-event    | 是否触发表单验证 | boolean    | true   |

### DatetimeRangePickerPopoutEmits

| 事件                               | 描述                         | 类型                               |
| ---------------------------------- | ---------------------------- | ---------------------------------- |
| update:model-value                 | 日期时间输入组件值改变时触发 | (date: (Date \| string)[]) => void |
| change                             | 日期时间输入组件值改变时触发 | (date: (Date \| string)[]) => void |
| update:visible                     | 弹出框显隐时触发             | (visible: boolean) => void         |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发  | (name: TransitionHookName) => void |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发           | () => void                         |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发           | () => void                         |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发           | () => void                         |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发           | () => void                         |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发           | () => void                         |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发           | () => void                         |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发           | () => void                         |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发           | () => void                         |
