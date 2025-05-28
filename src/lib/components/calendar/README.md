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

更多案例，请参考 [CalendarPopout 组件](./calendar-popout)

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
