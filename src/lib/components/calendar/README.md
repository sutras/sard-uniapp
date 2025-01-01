---
nav: 组件
title: Calendar
subtitle: 日历
group:
  title: 表单组件
  order: 2
---

## 介绍

以日历的方式展示日期，可以进行单选、多选、范围选择等操作。

## 引入

```ts
import Calendar from 'sard-uniapp/components/calendar/calendar.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值。

@code('${DEMO_PATH}/calendar/demo/Basic.vue')

### 类型

日历组件可以选择单个值、多个值以及进行范围选择。

@code('${DEMO_PATH}/calendar/demo/Type.vue')

### 自定义日期范围

可以使用 `min` 和 `max` 属性限制可以选择的日期的范围。

@code('${DEMO_PATH}/calendar/demo/MinMax.vue')

### 最多选择天数

在多个值和范围选择中，使用 `maxDays` 属性可以限制最多可选的天数。
超出允许选择的天数后会调用 `overMaxDays` 属性配置的函数。

@code('${DEMO_PATH}/calendar/demo/MaxDays.vue')

### 禁用日期

`disabledDate` 属性配置的函数接收一个日期对象，如果此函数返回真则禁用这个日期。

@code('${DEMO_PATH}/calendar/demo/DisabledDate.vue')

### 自定义起始周

默认一周从星期天开始，使用 `weekStartsOn` 属性可以配置一周从任意星期开始。
0 表示从周日开始，1 表示从周一开始。

@code('${DEMO_PATH}/calendar/demo/WeekStartsOn.vue')

### 格式化日期

`formatter` 属性可以配置一个接收 `CalendarDay` 类型的对象，通过此对象可以自定义当前日期展示的内容和样式。

@code('${DEMO_PATH}/calendar/demo/Formatter.vue')

### 展示多个月

默认只展示一个月，如果要表现上下月之间的强关联性，可以设置 `severalMonths` 属性以展示多个月。
这时设置的最大最小值范围不能太大，避免渲染大量节点造成性能问题。

@code('${DEMO_PATH}/calendar/demo/Several.vue')

## API

### CalendarProps

| 属性                          | 描述                                                                 | 类型                                                  | 默认值                                          |
| ----------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| root-class                    | 组件根元素类名                                                       | string                                                | -                                               |
| root-style                    | 组件根元素样式                                                       | StyleValue                                            | -                                               |
| type                          | 日历类型                                                             | CalendarType                                          | 'single'                                        |
| model-value                   | 选中的日期，单选时为当个日期，多选时为日期数组，范围时为两个日期数组 | Date \| Date[] \| string \| string[]                  | -                                               |
| min                           | 可选择的最小日期                                                     | Date                                                  | 前十年，或者当前月（设置了 `several-months`）   |
| max                           | 可选择的最大日期                                                     | Date                                                  | 后十年，或者三个月后（设置了 `several-months`） |
| current-date                  | 当前展示月份的日期                                                   | Date                                                  | -                                               |
| disabled-date                 | 指定禁选日期，返回 `true` 表示禁选                                   | (date: Date) => boolean                               | -                                               |
| max-days                      | 最多可选天数，用于多选和范围                                         | number                                                | Number.MAX_SAFE_INTEGER                         |
| over-max-days                 | 超出最多可选天数时触发                                               | () => void                                            | -                                               |
| week-starts-on                | 指定一周以周几开始，`0` 表示周日，`1-6` 分别表示周一至周六           | number                                                | 0                                               |
| formatter                     | 通过修改 `CalendarDay` 对象属性值，来自定义日期的文案和样式          | (day: CalendarDay) => void                            | -                                               |
| allow-same-day                | 范围选择中，是否允许起始和结束为同一天                               | boolean                                               | false                                           |
| several-months                | 是否显示多个月                                                       | boolean                                               | false                                           |
| value-format <sup>1.10+</sup> | 绑定值的格式，不指定则绑定值为 Date 对象                             | string [详见特殊符号](../guide/date#日期格式特殊符号) | -                                               |

### CalendarEmits

| 事件                     | 描述                     | 类型                                                  |
| ------------------------ | ------------------------ | ----------------------------------------------------- |
| update:model-value       | 点击并选中任意日期时触发 | (value: Date \| Date[] \| string \| string[]) => void |
| change <sup>1.9.2+</sup> | 点击并选中任意日期时触发 | (value: Date \| Date[] \| string \| string[]) => void |

### CalendarType

```ts
type CalendarType = 'single' | 'multiple' | 'range'
```

### CalendarDay

| 属性      | 描述                             | 类型                                                             |
| --------- | -------------------------------- | ---------------------------------------------------------------- |
| date      | 当前月份中每日对应的日期对象     | Date                                                             |
| disabled  | 是否禁用                         | boolean                                                          |
| type      | 日期类型，每个类型对应的含义如下 | 'same' \| 'start' \| 'middle' \| 'end' \| 'selected' \| 'normal' |
| top       | 额外的上方信息                   | string                                                           |
| text      | 中间显示的文字                   | string \| number                                                 |
| bottom    | 额外的下方信息                   | string                                                           |
| className | 类名                             | string                                                           |
| style     | 样式                             | StyleValue                                                       |

### CalendarDay['type']

| 类型     | 描述                         |
| -------- | ---------------------------- |
| same     | 表示起始和结束日期位于同一天 |
| start    | 表示起始日期                 |
| middle   | 表示位于起始和结束日期之间   |
| end      | 表示结束日期                 |
| disabled | 被禁用的日期                 |
| selected | 单选或多选时选中的日期       |
| normal   | 正常状态日期                 |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
