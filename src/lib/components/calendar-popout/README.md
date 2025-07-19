---
nav: 组件
title: CalendarPopout
subtitle: 日历弹出框
group: 表单组件
version: 1.16+
---

## 介绍

组合了日历、弹出框组件，实现了便捷快速的日历选择功能。

## 引入

```ts
import CalendarPopout from 'sard-uniapp/components/calendar-popout/calendar-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

@code('${DEMO_PATH}/calendar-popout/demo/Basic.vue')

### 类型

日历组件可以选择单个值、多个值以及进行范围选择。

@code('${DEMO_PATH}/calendar-popout/demo/Type.vue')

### 自定义日期范围

可以使用 `min` 和 `max` 属性限制可以选择的日期的范围。

@code('${DEMO_PATH}/calendar-popout/demo/MinMax.vue')

### 最多选择天数

在多个值和范围选择中，使用 `maxDays` 属性可以限制最多可选的天数。
超出允许选择的天数后会调用 `overMaxDays` 属性配置的函数。

@code('${DEMO_PATH}/calendar-popout/demo/MaxDays.vue')

### 禁用日期

`disabledDate` 属性配置的函数接收一个日期对象，如果此函数返回真则禁用这个日期。

@code('${DEMO_PATH}/calendar-popout/demo/DisabledDate.vue')

### 自定义起始周

默认一周从星期天开始，使用 `weekStartsOn` 属性可以配置一周从任意星期开始。
0 表示从周日开始，1 表示从周一开始。

@code('${DEMO_PATH}/calendar-popout/demo/WeekStartsOn.vue')

### 格式化日期

`formatter` 属性可以配置一个接收 `CalendarDay` 类型的对象，通过此对象可以自定义当前日期展示的内容和样式。

@code('${DEMO_PATH}/calendar-popout/demo/Formatter.vue')

### 展示多个月

默认只展示一个月，如果要表现上下月之间的强关联性，可以设置 `severalMonths` 属性以展示多个月。
这时设置的最大最小值范围不能太大，避免渲染大量节点造成性能问题。

@code('${DEMO_PATH}/calendar-popout/demo/Several.vue')

## API

### CalendarPopoutProps

继承 [`CalendarProps`](./calendar#CalendarProps) 并有以下额外属性：

| 属性              | 描述                                     | 类型       | 默认值 |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| popout-class      | 弹窗框根元素类名                         | string     | -      |
| popout-style      | 弹窗框根元素样式                         | StyleValue | -      |
| visible (v-model) | 是否显示弹出框                           | boolean    | -      |
| title             | 弹出框标题                               | string     | -      |
| show-confirm      | 是否显示确定按钮，隐藏按钮可用于快捷选择 | boolean    | true   |
| validate-event    | 是否触发表单验证                         | boolean    | true   |

### CalendarPopoutSlots

| 插槽                             | 描述               | 属性 |
| -------------------------------- | ------------------ | ---- |
| title <sup>1.19.2+</sup>         | 自定义标题         | -    |
| title-prepend <sup>1.19.2+</sup> | 自定义标题前面内容 | -    |

### CalendarPopoutEmits

| 事件                               | 描述                        | 类型                                                               |
| ---------------------------------- | --------------------------- | ------------------------------------------------------------------ |
| update:model-value                 | 日历组件值改变时触发        | (value: Date \| Date[] \| string \| string[] \| undefined) => void |
| change                             | 日历组件值改变时触发        | (value: Date \| Date[] \| string \| string[] \| undefined) => void |
| update:visible                     | 弹出框显隐时触发            | (visible: boolean) => void                                         |
| confirm <sup>1.22.1+</sup>         | 点击确定按钮时触发          | () => void                                                         |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void                                 |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发          | () => void                                                         |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发          | () => void                                                         |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发          | () => void                                                         |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发          | () => void                                                         |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发          | () => void                                                         |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发          | () => void                                                         |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发          | () => void                                                         |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发          | () => void                                                         |
