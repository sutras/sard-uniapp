---
nav: 组件
title: DatetimeRangePicker
subtitle: 日期时间范围选择器
group: 表单组件
version: 1.11+
---

## 介绍

用于选择日期时间范围。

## 引入

```ts
import DatetimeRangePicker from 'sard-uniapp/components/datetime-range-picker/datetime-range-picker.vue'
```

## 代码演示

### 基础使用

和 `DatetimePicker` 组件用法类似，多了一个 `tabs` 属性设置起始和结束标签页标题。

@code('${DEMO_PATH}/datetime-range-picker/demo/Basic.vue')

## API

### DatetimeRangePickerProps

继承 [`DatetimePickerProps`](./datetime-picker#DatetimePickerProps) 并有以下额外属性：

| 属性        | 描述                     | 类型               | 默认值 |
| ----------- | ------------------------ | ------------------ | ------ |
| model-value | 绑定的值                 | (Date \| string)[] | -      |
| tabs        | 设置起始和结束标签页标题 | string[]           | -      |

### DatetimeRangePickerEmits

| 事件               | 描述                 | 类型                               |
| ------------------ | -------------------- | ---------------------------------- |
| update:model-value | 选中的选项改变时触发 | (date: (Date \| string)[]) => void |
| change             | 选中的选项改变时触发 | (date: (Date \| string)[]) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
