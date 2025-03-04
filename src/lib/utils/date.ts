import { escapeRegExp } from './regexp'
import { minmax } from './utils'

// 判断是否为闰年
export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// 获取一个月中的天数
export function getDaysInMonth(year: number, month: number) {
  month++
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  } else {
    return [4, 6, 9, 11].includes(month) ? 30 : 31
  }
}

// 获取一个月中一号对应的星期
export function getDayOnFirstOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

// 获取 Date 中的总天数
export function getDaysInDate(date: Date) {
  return Math.floor(date.getTime() / 1000 / 60 / 60 / 24)
}

// 把日期转换为年月日数值
export function toDateNumber(date: Date) {
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()
}

// 把日期转换为年月日字符串
export function toDateString(date: Date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 把日期转换为年月数值
export function toMonthNumber(date: Date) {
  return date.getFullYear() * 10000 + date.getMonth() * 100
}

// 获取从开头开始填充的日期
export function getPadStartDays(year: number, month: number, amount: number) {
  const dates: Date[] = []
  for (let i = amount - 1; i >= 0; i--) {
    dates.push(new Date(year, month, -i))
  }
  return dates
}

// 获取从结尾开始填充的日期
export function getPadEndDays(year: number, month: number, amount: number) {
  const dates: Date[] = []
  for (let i = 1; i <= amount; i++) {
    dates.push(new Date(year, month + 1, i))
  }
  return dates
}

// 获取一号偏移的天数
export function getOffsetDaysFromFirstDay(
  weekOnFirstDay: number,
  weekStartsOn: number,
) {
  return (weekOnFirstDay - weekStartsOn + 7) % 7
}

const dateTokensReg = /(YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS)/g

const dateGetters = {
  YYYY: (date: Date) => String(date.getFullYear()).padStart(4, '0'),
  YY: (date: Date) => String(date.getFullYear()).slice(-2),
  MM: (date: Date) => String(date.getMonth() + 1).padStart(2, '0'),
  M: (date: Date) => String(date.getMonth() + 1),
  DD: (date: Date) => String(date.getDate()).padStart(2, '0'),
  D: (date: Date) => String(date.getDate()),
  HH: (date: Date) => String(date.getHours()).padStart(2, '0'),
  H: (date: Date) => String(date.getHours()),
  hh: (date: Date) => String(date.getHours() % 24).padStart(2, '0'),
  h: (date: Date) => String(date.getHours() % 24),
  mm: (date: Date) => String(date.getMinutes()).padStart(2, '0'),
  m: (date: Date) => String(date.getMinutes()),
  ss: (date: Date) => String(date.getSeconds()).padStart(2, '0'),
  s: (date: Date) => String(date.getSeconds()),
  SSS: (date: Date) => String(date.getMilliseconds()).padStart(3, '0'),
}

// 根据传入的占位符返回格式化后的日期
export function formatDate(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return format.replace(dateTokensReg, (match) => {
    return dateGetters[match as keyof typeof dateGetters](date)
  })
}

const defaultTokenFrags = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss', 'SSS']

const dateSetters = {
  YYYY: (date: Date, year: number) => date.setFullYear(year),
  YY: (date: Date, year: number) => date.setFullYear(year),
  MM: (date: Date, month: number) => date.setMonth(month - 1),
  M: (date: Date, month: number) => date.setMonth(month - 1),
  DD: (date: Date, d: number) => date.setDate(d),
  D: (date: Date, d: number) => date.setDate(d),
  HH: (date: Date, hours: number) => date.setHours(hours),
  H: (date: Date, hours: number) => date.setHours(hours),
  hh: (date: Date, hours: number) => date.setHours(hours),
  h: (date: Date, hours: number) => date.setHours(hours),
  mm: (date: Date, minutes: number) => date.setMinutes(minutes),
  m: (date: Date, minutes: number) => date.setMinutes(minutes),
  ss: (date: Date, seconds: number) => date.setSeconds(seconds),
  s: (date: Date, seconds: number) => date.setSeconds(seconds),
  SSS: (date: Date, milliseconds: number) => date.setMilliseconds(milliseconds),
}

function parseDateWithoutFormat(value: string) {
  const numbers = value.split(/\D+/).filter(Boolean)
  const tokens = defaultTokenFrags.slice(0, numbers.length)
  const date = new Date(0, 0)
  tokens.forEach((token, i) => {
    dateSetters[token as keyof typeof dateSetters](date, Number(numbers[i]))
  })
  return date
}

// 解析日期的字符串表示形式，并返回 Date 实例对象
export function parseDate(value: string, format?: string) {
  if (!format) {
    return parseDateWithoutFormat(value)
  }

  const frags = format.split(dateTokensReg)
  const reg = new RegExp(
    '^' +
      frags
        .filter((_, i) => i % 2 === 0)
        .map((item) => escapeRegExp(item))
        .join('(.*)') +
      '$',
  )
  const dateFrags = reg.exec(value)?.slice(1)

  if (!dateFrags) {
    return parseDateWithoutFormat(value)
  }

  const tokenFrags = frags.filter((_, i) => i % 2 !== 0)

  const date = new Date(0)

  tokenFrags.forEach((token, i) => {
    dateSetters[token as keyof typeof dateSetters](date, Number(dateFrags[i]))
  })

  return date
}

// 确保返回一个Date对象，如果传递字符串，则使用 parseDate 解析
export function toDate(date: Date | string, valueFormat?: string) {
  if (date instanceof Date) {
    return date
  }
  return parseDate(date, valueFormat)
}

// 限定日期范围
export function minmaxDate(date: Date, minDate: Date, maxDate: Date) {
  return new Date(minmax(date.getTime(), minDate.getTime(), maxDate.getTime()))
}

// 获取上一个月的日期对象
export function getPrevMonthDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

// 获取下一个月的日期对象
export function getNextMonthDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}
