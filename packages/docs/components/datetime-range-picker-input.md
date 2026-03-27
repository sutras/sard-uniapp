---
title: DatetimeRangePickerInput
subtitle: 日期时间范围输入框
group: 表单组件
version: 1.11+
---

## 介绍

组合了日期时间范围弹出框、输入框组件，实现了便捷快速的日期时间范围选择功能。

## 引入

```js
import DatetimeRangePickerInput from 'sard-uniapp/components/datetime-range-picker-input/datetime-range-picker-input.vue'
```

## 代码演示

### 基础使用

和 `DatetimePickerInput` 组件用法类似，多了一个 `tabs` 属性设置起始和结束标签页标题。

<<< @demo/datetime-range-picker-input/demo/Basic.vue

### 输入框日期格式

使用 `outlet-format` 属性自定义输入框日期展示的格式。

<<< @demo/datetime-range-picker-input/demo/OutletFormat.vue

### 绑定值的格式

默认绑定的值为 `Date` 实例，提交到后端时需要手动转换为特定格式的字符串；使用 `value-format` 属性可以将这个转换交由组件库处理。

<<< @demo/datetime-range-picker-input/demo/ValueFormat.vue

### 插槽

可以使用 `header` 插槽在顶部添加快捷选择按钮。

<<< @demo/datetime-range-picker-input/demo/Slot.vue

## API

### DatetimeRangePickerInputProps

继承 [`DatetimeRangePickerPopoutProps`](./datetime-range-picker-popout#DatetimeRangePickerPopoutProps) 并有以下额外属性：

| 属性                              | 描述                                                         | 类型                                                      | 默认值            |
| --------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ----------------- |
| root-class                        | 弹出式输入框根元素类名                                       | string                                                    | -                 |
| root-style                        | 弹出式输入框根元素样式                                       | StyleValue                                                | -                 |
| disabled                          | 禁用状态                                                     | boolean                                                   | false             |
| readonly                          | 只读状态                                                     | boolean                                                   | false             |
| clearable                         | 是否显示清空按钮                                             | boolean                                                   | false             |
| placeholder                       | 输入框占位符内容                                             | string                                                    | -                 |
| outlet-format                     | 输出到输入框的日期格式，不指定则根据 `type` 属性自动生成格式 | string [详见特殊符号](../utilities/date#日期格式特殊符号) | -                 |
| value-on-clear <sup>1.19.2+</sup> | 设置点击清除按钮后的值                                       | `() => any`                                               | `() => undefined` |
| arrow <sup>1.22+</sup>            | 自定义箭头图标名                                             | string                                                    | 'caret-right'     |
| arrow-family <sup>1.22+</sup>     | 自定义箭头图标字体                                           | string                                                    | 'sari'            |
| input-props <sup>1.22+</sup>      | 自定义输入框组件属性                                         | InputProps                                                | -                 |

### DatetimeRangePickerInputSlots

继承 [`PopoutInputSlots`](./popout-input#PopoutInputSlots) 和 [`DatetimeRangePickerPopoutSlots`](./datetime-range-picker-popout#DatetimeRangePickerPopoutSlots)

### DatetimeRangePickerInputEmits

继承 [`DatetimeRangePickerPopoutEmits`](./datetime-range-picker-popout#DatetimeRangePickerPopoutEmits)
