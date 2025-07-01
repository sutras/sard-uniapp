---
nav: 工具
title: 日期
group:
  title: 工具
  order: 1

version: 1.20+
---

## 介绍

提供了日期相关的工具函数。

## 使用

```ts
import { formatDate } from 'sard-uniapp'

formatDate(new Date(), 'YYYY-MM-DD')
```

## 接口

### isLeapYear

```ts
function isLeapYear(year: number): boolean
```

判断是否为闰年。

### getDaysInMonth

```ts
function getDaysInMonth(year: number, month: number): number
```

获取某月的天数，月份从0开始。

### getDayOfYear

```ts
function getDayOfYear(date: Date): number
```

获取当前日期是一年中的第几天。

### getFirstDayWeekday

```ts
function getFirstDayWeekday(year: number, month: number): number
```

获取指定月份第一天是星期几，月份从0开始。

### getDaysSinceUnixEpoch

```ts
function getDaysSinceUnixEpoch(date: Date): number
```

获取从基准日期（如1970-01-01）到指定日期的总天数。

### toDateNumber

```ts
function toDateNumber(date: Date): number
```

把日期转换为年月日数值，例如：2025年7月1号 -> 20250601。

### toDateString

```ts
function toDateString(date: Date): string
```

把日期转换为年月日字符串，，例如：2025年7月1号 -> 2025-7-1。

### toMonthNumber

```ts
function toMonthNumber(date: Date): number
```

把日期转换为年月数值，例如：2025年7月1号 -> 20250600。

### getDaysBeforeFirstDay

```ts
function getDaysBeforeFirstDay(
  year: number,
  month: number,
  weekStartsOn?: number,
): number
```

计算当前月份1号前面需要显示的上个月末尾的天数。

### getDaysAfterLastDay

```ts
function getDaysAfterLastDay(
  year: number,
  month: number,
  weekStartsOn?: number,
): number
```

获取当前月份最后一天之后需要显示的下个月开始的天数。

### getPrevMonthTailDays

```ts
function getPrevMonthTailDays(
  year: number,
  month: number,
  weekStartsOn?: number,
): Date[]
```

获取当前月份1号之前需要显示的上个月末尾的日期。

### getNextMonthHeadDays

```ts
function getNextMonthHeadDays(
  year: number,
  month: number,
  weekStartsOn?: number,
): Date[]
```

获取当前月份最后一天之后需要显示的下个月开始的日期。

### formatDate

```ts
function formatDate(date: Date, format?: string): string
```

根据传入的占位符返回格式化后的日期。

### parseDate

```ts
function parseDate(value: string, format?: string): Date
```

解析日期的字符串表示形式，并返回 Date 实例对象。

### toDate

```ts
function toDate(date: Date | string, valueFormat?: string): Date
```

确保返回一个Date对象，如果传递字符串，则使用 parseDate 解析。

### minmaxDate

```ts
function minmaxDate(date: Date, minDate: Date, maxDate: Date): Date
```

限定日期范围，会返回一个新的日期。

### getPrevMonthDate

```ts
function getPrevMonthDate(date: Date): Date
```

获取上一个月的日期对象。

### getNextMonthDate

```ts
function getNextMonthDate(date: Date): Date
```

获取下一个月的日期对象。

### getLunarLeapMonth

```ts
function getLunarLeapMonth(year: number): number
```

获取农历某年闰月的月份，月份从1开始（0表示无闰月）。

### getLunarLeapMonthDays

```ts
function getLunarLeapMonthDays(year: number): number
```

获取农历某年闰月的天数。

### getLunarYearDays

```ts
function getLunarYearDays(year: number): number
```

获取农历某年的总天数。

### getLunarMonthDays

```ts
function getLunarMonthDays(year: number, month: number): number
```

获取农历某年某月的天数，月份从1开始。

### solarToLunar

```ts
function solarToLunar(
  year: number,
  month: number,
  day: number,
): { year: number; month: number; day: number }
```

公历转农历，月份从1开始（返回的闰月为负数）。

### lunarToSolar

```ts
function lunarToSolar(
  year: number,
  month: number,
  day: number,
): { year: number; month: number; day: number }
```

农历转公历，月份从1开始（闰月需传递负数）。

### getLunarYearName

```ts
function getLunarYearName(year: number): string
```

将阿拉伯数字的年份转为汉字数字年份。

### getLunarMonthName

```ts
function getLunarMonthName(month: number, isLeapMonth?: boolean): string
```

获取农历月份名称，月份从1开始，例如：正月，十月，腊月。

### getLunarDayName

```ts
function getLunarDayName(day: number): string
```

获取农历日期名称，例如：初一，十二，廿一。

### getLunarHourName

```ts
function getLunarHourName(hour: number): string
```

获取农历时辰名称，例如：子初、子正、午初，午正。

## 日期格式特殊符号

根据传入的带有特殊符号的字符串获取格式化的日期。

| 符号 | 描述             |
| ---- | ---------------- |
| YYYY | 四位年份         |
| YY   | 两位年份         |
| MM   | 两位月份         |
| M    | 一位月份         |
| DD   | 两位日期         |
| D    | 一位日期         |
| HH   | 两位二十四制小时 |
| H    | 一位二十四制小时 |
| hh   | 两位十二制小时   |
| h    | 一位十二制小时   |
| mm   | 两位分钟         |
| m    | 一位分钟         |
| ss   | 两位秒数         |
| s    | 一位秒数         |
| SSS  | 毫秒数           |
