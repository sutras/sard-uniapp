---
nav: 组件
title: CalendarInput
subtitle: 日历输入框
group: 表单组件
---

## 介绍

组合了日历、弹出框、输入框组件，实现了便捷快速的日历选择功能。

## 引入

```ts
import CalendarInput from 'sard-uniapp/components/calendar-input/calendar-input.vue'
```

## 代码演示

### 基础使用

日历输入框组件接收日历组件相同的属性，另外可以通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹日历的弹出框。

@code('${DEMO_PATH}/calendar-input/demo/Basic.vue')

### 输入框日期格式

使用 `outlet-format` 属性自定义输入框日期展示的格式。

@code('${DEMO_PATH}/calendar-input/demo/OutletFormat.vue')

### 绑定值的格式

默认绑定的值为 `Date` 实例，提交到后端时需要手动转换为特定格式的字符串；使用 `value-format` 属性可以将这个转换交由组件库处理。

@code('${DEMO_PATH}/calendar-input/demo/ValueFormat.vue')

### 类型

@code('${DEMO_PATH}/calendar-input/demo/Type.vue')

## API

### CalendarInputProps

继承 [`CalendarProps`](./calendar#CalendarProps) 并有以下额外属性：

| 属性                           | 描述                                     | 类型                                                  | 默认值       |
| ------------------------------ | ---------------------------------------- | ----------------------------------------------------- | ------------ |
| disabled                       | 禁用状态                                 | boolean                                               | false        |
| readonly                       | 只读状态                                 | boolean                                               | false        |
| clearable                      | 是否显示清空按钮                         | boolean                                               | false        |
| placeholder                    | 输入框占位符内容                         | string                                                | -            |
| visible (v-model)              | 是否显示弹出框                           | boolean                                               | -            |
| title                          | 弹出框标题，不设置则取 `placeholder` 值  | string                                                | -            |
| show-confirm                   | 是否显示确定按钮，隐藏按钮可用于快捷选择 | boolean                                               | true         |
| validate-event                 | 是否触发表单验证                         | boolean                                               | true         |
| outlet-format <sup>1.10+</sup> | 输出到输入框的日期格式                   | string [详见特殊符号](../guide/date#日期格式特殊符号) | 'YYYY-MM-DD' |

### CalendarInputEmits

| 事件                     | 描述                     | 类型                                                               |
| ------------------------ | ------------------------ | ------------------------------------------------------------------ |
| update:model-value       | 日历输入组件值改变时触发 | (value: Date \| Date[] \| string \| string[] \| undefined) => void |
| change <sup>1.9.2+</sup> | 日历输入组件值改变时触发 | (value: Date \| Date[] \| string \| string[] \| undefined) => void |
| update:visible           | 弹出框显隐时触发         | (visible: boolean) => void                                         |
