---
nav: 组件
title: DatetimePicker
subtitle: 日期时间选择器
group: 表单组件
---

## 介绍

用于选择日期时间。

## 引入

```ts
import DatetimePicker from 'sard-uniapp/components/datetime-picker/datetime-picker.vue'
```

## 代码演示

### 基础使用

通过 `v-model` 绑定当前值，通过 `type` 属性设置要展示的列类型。

@code('${DEMO_PATH}/datetime-picker/demo/Basic.vue')

更多案例，请参考 [DatetimePickerPopout 组件](./datetime-picker-popout)

## API

### DatetimePickerProps

| 属性                          | 描述                                         | 类型                                                                                                            | 默认值  |
| ----------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------- |
| root-class                    | 组件根元素类名                               | string                                                                                                          | -       |
| root-style                    | 组件根元素样式                               | StyleValue                                                                                                      | -       |
| type                          | 设置每一列要展示的数据类型，每个字母对应一列 | string [详见特殊符号](#DatetimeLetter)                                                                          | 'yMd'   |
| calendar <sup>1.18+</sup>     | 历法类型，可选公历或农历                     | 'solar' \| 'lunar'                                                                                              | 'solar' |
| min                           | 可选的最小日期                               | Date                                                                                                            | 十年前  |
| max                           | 可选的最大日期                               | Date                                                                                                            | 十年后  |
| model-value                   | 当前选中的日期                               | Date \| string                                                                                                  | -       |
| filter                        | 选项的过滤函数                               | (letter: DatetimeLetter, value: number, date: Date, index: number) => boolean                                   | -       |
| formatter                     | 选项的格式化函数                             | (letter: DatetimeLetter, option: DatetimeColumnOption, date: Date, index: number) => string \| void \|undefined | -       |
| value-format <sup>1.10+</sup> | 绑定值的格式，不指定则绑定值为 Date 对象     | string [详见特殊符号](../guide/date#日期格式特殊符号)                                                           | -       |

### DatetimePickerEmits

| 事件                     | 描述                 | 类型                           |
| ------------------------ | -------------------- | ------------------------------ |
| update:model-value       | 选中的选项改变时触发 | (date: Date \| string) => void |
| change <sup>1.9.2+</sup> | 选中的选项改变时触发 | (date: Date \| string) => void |

### DatetimeLetter

```ts
type DatetimeLetter = 'y' | 'M' | 'd' | 'h' | 'm' | 's'
```

上面每个字母分别代表“年月日时分秒”。

### DatetimeColumnOption

| 属性     | 描述                                               | 类型                        |
| -------- | -------------------------------------------------- | --------------------------- |
| value    | 选项值，如果是农历闰月，此值会为负数               | number                      |
| label    | 展示的文本，默认中文会在值的后面加上“年月日时分秒” | string \| number \| boolean |
| zerofill | 填充前置 0 后的选项值字符串，可在格式化时使用      | string                      |

### 农历相关API <sup>1.18+</sup>

#### solarToLunar

```ts
function solarToLunar(
  year: number,
  month: number,
  day: number,
): {
  year: number
  month: number
  day: number
}
```

接收公历的年月日（月份从1开始），返回农历的年月日。如果返回的月份为负数，则为闰月。

#### lunarToSolar

```ts
function lunarToSolar(
  year: number,
  month: number,
  day: number,
): {
  year: number
  month: number
  day: number
}
```

接收农历的年月日（月份从1开始），返回公历的年月日。如果农历月份为闰月，需传递负数。

#### getLunarYearName

```ts
function getLunarYearName(year: number): string
```

接收数字年份，返回中文数字年份，例如：`2025 -> '二零二五年'`。

#### getLunarMonthName

```ts
function getLunarMonthName(month: number, isLeapMonth?: boolean): string
```

- 参数
  - month: 农历月份，从1开始；
  - isLeapMonth: 是否为闰月。

获取农历月份名称。

#### getLunarDayName

```ts
function getLunarDayName(day: number): string
```

获取农历日期名称。

#### getLunarHourName

```ts
function getLunarHourName(hour: number): string
```

获取农历时辰名称。
