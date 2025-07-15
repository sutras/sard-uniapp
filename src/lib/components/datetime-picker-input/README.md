---
nav: 组件
title: DatetimePickerInput
subtitle: 日期时间输入框
group: 表单组件
---

## 介绍

组合了日期时间弹出框、输入框组件，实现了便捷快速的日期选择功能。

## 引入

```ts
import DatetimePickerInput from 'sard-uniapp/components/datetime-picker-input/datetime-picker-input.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示日期时间弹出框。

@code('${DEMO_PATH}/datetime-picker-input/demo/Basic.vue')

### 输入框日期格式

使用 `outlet-format` 属性自定义输入框日期展示的格式。

@code('${DEMO_PATH}/datetime-picker-input/demo/OutletFormat.vue')

### 绑定值的格式

默认绑定的值为 `Date` 实例，提交到后端时需要手动转换为特定格式的字符串；使用 `value-format` 属性可以将这个转换交由组件库处理。

@code('${DEMO_PATH}/datetime-picker-input/demo/ValueFormat.vue')

### min、max 联动

可以通过 `min` 和 `max` 属性使两个选择器联动。

选择日期时间范围，使用 `DatetimeRangePickerInput` 是更好的选择。

@code('${DEMO_PATH}/datetime-picker-input/demo/Range.vue')

## API

### DatetimePickerInputProps

继承 [`DatetimePickerPopoutProps`](./datetime-picker-popout#DatetimePickerPopoutProps) 并有以下额外属性：

| 属性                              | 描述                                                         | 类型                                                      | 默认值          |
| --------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- | --------------- |
| root-class                        | 弹出式输入框根元素类名                                       | string                                                    | -               |
| root-style                        | 弹出式输入框根元素样式                                       | StyleValue                                                | -               |
| disabled                          | 禁用状态                                                     | boolean                                                   | false           |
| readonly                          | 只读状态                                                     | boolean                                                   | false           |
| clearable                         | 是否显示清空按钮                                             | boolean                                                   | false           |
| placeholder                       | 输入框占位符内容                                             | string                                                    | -               |
| outlet-format                     | 输出到输入框的日期格式，不指定则根据 `type` 属性自动生成格式 | string [详见特殊符号](../utilities/date#日期格式特殊符号) | -               |
| value-on-clear <sup>1.19.2+</sup> | 设置点击清除按钮后的值                                       | () => any                                                 | () => undefined |
| arrow <sup>1.22+</sup>            | 自定义箭头图标名                                             | string                                                    | 'caret-right'   |
| arrow-family <sup>1.22+</sup>     | 自定义箭头图标字体                                           | string                                                    | 'sari'          |

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

### DatetimePickerInputSlots

| 插槽                   | 描述       | 属性       |
| ---------------------- | ---------- | ---------- |
| arrow <sup>1.22+</sup> | 自定义箭头 | () => void |

### DatetimePickerInputEmits

继承 [`DatetimePickerPopoutEmits`](./datetime-picker-popout#DatetimePickerPopoutEmits)
