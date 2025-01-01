---
nav: 组件
title: DatetimePickerInput
subtitle: 日期时间输入框
group: 表单组件
---

## 介绍

组合了日期时间、弹出框、输入框组件，实现了便捷快速的日期选择功能。

## 引入

```ts
import DatetimePickerInput from 'sard-uniapp/components/datetime-picker-input/datetime-picker-input.vue'
```

## 代码演示

### 基础使用

日期时间输入框组件接收日期时间组件相同的属性，另外可以通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹日期时间的弹出框。

@code('${DEMO_PATH}/datetime-picker-input/demo/Basic.vue')

### 输入框日期格式

使用 `outlet-format` 属性自定义输入框日期展示的格式。

@code('${DEMO_PATH}/datetime-picker-input/demo/OutletFormat.vue')

### 绑定值的格式

默认绑定的值为 `Date` 实例，提交到后端时需要手动转换为特定格式的字符串；使用 `value-format` 属性可以将这个转换交由组件库处理。

@code('${DEMO_PATH}/datetime-picker-input/demo/ValueFormat.vue')

## API

### DatetimePickerInputProps

继承 [`DatetimePickerProps`](./datetime-picker#DatetimePickerProps) 并有以下额外属性：

| 属性              | 描述                                                         | 类型                                                  | 默认值 |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------------------- | ------ |
| disabled          | 禁用状态                                                     | boolean                                               | false  |
| readonly          | 只读状态                                                     | boolean                                               | false  |
| clearable         | 是否显示清空按钮                                             | boolean                                               | false  |
| placeholder       | 输入框占位符内容                                             | string                                                | -      |
| visible (v-model) | 是否显示弹出框                                               | boolean                                               | -      |
| title             | 弹出框标题，不设置则取 `placeholder` 值                      | string                                                | -      |
| outlet-format     | 输出到输入框的日期格式，不指定则根据 `type` 属性自动生成格式 | string [详见特殊符号](../guide/date#日期格式特殊符号) | -      |
| validate-event    | 是否触发表单验证                                             | boolean                                               | true   |

### `type` 到 `outletFormat` 的映射：

```ts
const mapTypeFormat = {
  y: 'YYYY',
  yM: 'YYYY-MM',
  yMd: 'YYYY-MM-DD',
  yMdh: 'YYYY-MM-DD HH',
  yMdhm: 'YYYY-MM-DD HH:mm',
  yMdhms: 'YYYY-MM-DD HH:mm:ss',
  hm: 'HH:mm',
  hms: 'HH:mm:ss',
}
```

### DatetimePickerInputEmits

| 事件                     | 描述                         | 类型                                         |
| ------------------------ | ---------------------------- | -------------------------------------------- |
| update:model-value       | 日期时间输入组件值改变时触发 | (value: Date \| string \| undefined) => void |
| change <sup>1.9.2+</sup> | 日期时间输入组件值改变时触发 | (value: Date \|string \| undefined) => void  |
| update:visible           | 弹出框显隐时触发             | (visible: boolean) => void                   |
