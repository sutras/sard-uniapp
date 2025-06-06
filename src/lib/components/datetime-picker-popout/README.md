---
nav: 组件
title: DatetimePickerPopout
subtitle: 日期时间弹出框
group: 表单组件
version: 1.16+
---

## 介绍

组合了日期时间、弹出框组件，实现了便捷快速的日期选择功能。

## 引入

```ts
import DatetimePickerPopout from 'sard-uniapp/components/datetime-picker-popout/datetime-picker-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

@code('${DEMO_PATH}/datetime-picker-popout/demo/Basic.vue')

### 类型

可以使用 `yMdhms`（年月日时分秒）进行任意组合，每个字母对应一列。

@code('${DEMO_PATH}/datetime-picker-popout/demo/Type.vue')

### 自定义日期时间范围

可以使用 `min` 和 `max` 属性限制可以选择的日期时间的范围。

@code('${DEMO_PATH}/datetime-picker-popout/demo/MinMax.vue')

### 过滤器

可以使用 `filter` 属性来仅展示想要的内容，只有返回真的值才会展示。

@code('${DEMO_PATH}/datetime-picker-popout/demo/Filter.vue')

### 格式化

可以使用 `formatter` 属性格式化展示的内容。

@code('${DEMO_PATH}/datetime-picker-popout/demo/Formatter.vue')

### 农历

可以设置 `calendar="lunar"` 将历法类型改为农历。农历仅用于展示，实际绑定的值还是公历。

@code('${DEMO_PATH}/datetime-picker-popout/demo/Calendar.vue')

## API

### DatetimePickerPopoutProps

继承 [`DatetimePickerProps`](./datetime-picker#DatetimePickerProps) 并有以下额外属性：

| 属性              | 描述             | 类型       | 默认值 |
| ----------------- | ---------------- | ---------- | ------ |
| popout-class      | 弹窗框根元素类名 | string     | -      |
| popout-style      | 弹窗框根元素样式 | StyleValue | -      |
| visible (v-model) | 是否显示弹出框   | boolean    | -      |
| title             | 弹出框标题       | string     | -      |
| validate-event    | 是否触发表单验证 | boolean    | true   |

### DatetimePickerPopoutEmits

| 事件               | 描述                         | 类型                                         |
| ------------------ | ---------------------------- | -------------------------------------------- |
| update:model-value | 日期时间输入组件值改变时触发 | (value: Date \| string \| undefined) => void |
| change             | 日期时间输入组件值改变时触发 | (value: Date \|string \| undefined) => void  |
| update:visible     | 弹出框显隐时触发             | (visible: boolean) => void                   |
