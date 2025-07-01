import { clamp } from './number'
import { escapeRegExp } from './regexp'

/**
 * 判断是否为闰年。
 */
export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * 获取某月的天数，月份从0开始。
 */
export function getDaysInMonth(year: number, month: number) {
  if (month === 1) {
    return isLeapYear(year) ? 29 : 28
  } else {
    return monthDays[month]
  }
}

/**
 * 获取当前日期是一年中的第几天。
 */
export function getDayOfYear(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const d = date.getDate()
  let days = 0
  for (let m = 0; m < month; m++) {
    days += getDaysInMonth(year, m)
  }
  return days + d
}

/**
 * 获取指定月份第一天是星期几，月份从0开始。
 */
export function getFirstDayWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

/**
 * 获取从基准日期（如1970-01-01）到指定日期的总天数。
 */
export function getDaysSinceUnixEpoch(date: Date) {
  return Math.floor(date.getTime() / 1000 / 60 / 60 / 24)
}

/**
 * 把日期转换为年月日数值，例如：2025年7月1号 -> 20250601。
 */
export function toDateNumber(date: Date) {
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()
}

/**
 * 把日期转换为年月日字符串，，例如：2025年7月1号 -> 2025-7-1。
 */
export function toDateString(date: Date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

/**
 * 把日期转换为年月数值，例如：2025年7月1号 -> 20250600。
 */
export function toMonthNumber(date: Date) {
  return date.getFullYear() * 10000 + date.getMonth() * 100
}

/**
 * 计算当前月份1号前面需要显示的上个月末尾的天数。
 */
export function getDaysBeforeFirstDay(
  year: number,
  month: number,
  weekStartsOn = 0,
) {
  const week = getFirstDayWeekday(year, month)
  return (week - weekStartsOn + 7) % 7
}

/**
 * 获取当前月份最后一天之后需要显示的下个月开始的天数。
 */
export function getDaysAfterLastDay(
  year: number,
  month: number,
  weekStartsOn = 0,
) {
  const daysBefore = getDaysBeforeFirstDay(year, month, weekStartsOn)
  return 42 - daysBefore - getDaysInMonth(year, month)
}

/**
 * 获取当前月份1号之前需要显示的上个月末尾的日期。
 */
export function getPrevMonthTailDays(
  year: number,
  month: number,
  weekStartsOn = 0,
) {
  const daysBefore = getDaysBeforeFirstDay(year, month, weekStartsOn)

  const dates: Date[] = []
  for (let i = daysBefore - 1; i >= 0; i--) {
    dates.push(new Date(year, month, -i))
  }
  return dates
}

/**
 * 获取当前月份最后一天之后需要显示的下个月开始的日期。
 */
export function getNextMonthHeadDays(
  year: number,
  month: number,
  weekStartsOn = 0,
) {
  const daysAfter = getDaysAfterLastDay(year, month, weekStartsOn)

  const dates: Date[] = []
  for (let i = 1; i <= daysAfter; i++) {
    dates.push(new Date(year, month + 1, i))
  }
  return dates
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

/**
 * 根据传入的占位符返回格式化后的日期。
 */
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

/**
 * 解析日期的字符串表示形式，并返回 Date 实例对象。
 */
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

// 确保返回一个Date对象，如果传递字符串，则使用 parseDate 解析。
export function toDate(date: Date | string, valueFormat?: string) {
  if (date instanceof Date) {
    return date
  }
  return parseDate(date, valueFormat)
}

// 限定日期范围，会返回一个新的日期。
export function minmaxDate(date: Date, minDate: Date, maxDate: Date) {
  return new Date(clamp(date.getTime(), minDate.getTime(), maxDate.getTime()))
}

// 获取上一个月的日期对象。
export function getPrevMonthDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

// 获取下一个月的日期对象。
export function getNextMonthDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

/****************************************************************
 * 农历
 ****************************************************************/

// prettier-ignore
export const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520, // 2100
]

// 1900-2100春节对应的公历日期
// prettier-ignore
export const springFestivals = [
  [1,31], [2,19], [2,8], [1,29], [2,16], [2,4], [1,25], [2,13], [2,2], [1,22], // 1900-1909
  [2,10], [1,30], [2,18], [2,6], [1,26], [2,14], [2,3], [1,23], [2,11], [2,1], // 1910-1919
  [2,20], [2,8], [1,28], [2,16], [2,5], [1,24], [2,13], [2,2], [1,23], [2,10], // 1920-1929
  [1,30], [2,17], [2,6], [1,26], [2,14], [2,4], [1,24], [2,11], [1,31], [2,19], // 1930-1939
  [2,8], [1,27], [2,15], [2,5], [1,25], [2,13], [2,2], [1,22], [2,10], [1,29], // 1940-1949
  [2,17], [2,6], [1,27], [2,14], [2,3], [1,24], [2,12], [1,31], [2,18], [2,8], // 1950-1959
  [1,28], [2,15], [2,5], [1,25], [2,13], [2,2], [1,21], [2,9], [1,30], [2,17], // 1960-1969
  [2,6], [1,27], [2,15], [2,3], [1,23], [2,11], [1,31], [2,18], [2,7], [1,28], // 1970-1979
  [2,16], [2,5], [1,25], [2,13], [2,2], [2,20], [2,9], [1,29], [2,17], [2,6], // 1980-1989
  [1,27], [2,15], [2,4], [1,23], [2,10], [1,31], [2,19], [2,7], [1,28], [2,16], // 1990-1999
  [2,5], [1,24], [2,12], [2,1], [1,22], [2,9], [1,29], [2,18], [2,7], [1,26], // 2000-2009
  [2,14], [2,3], [1,23], [2,10], [1,31], [2,19], [2,8], [1,28], [2,16], [2,5], // 2010-2019
  [1,25], [2,12], [2,1], [1,22], [2,10], [1,29], [2,17], [2,6], [1,26], [2,13], // 2020-2029
  [2,3], [1,23], [2,11], [1,31], [2,19], [2,8], [1,28], [2,15], [2,4], [1,24], // 2030-2039
  [2,12], [2,1], [1,22], [2,10], [1,30], [2,17], [2,6], [1,26], [2,14], [2,2], // 2040-2049
  [1,23], [2,11], [2,1], [2,19], [2,8], [1,28], [2,15], [2,4], [1,24], [2,12], // 2050-2059
  [2,2], [1,21], [2,9], [1,29], [2,17], [2,5], [1,26], [2,14], [2,3], [1,23], // 2060-2069
  [2,11], [1,31], [2,19], [2,7], [1,27], [2,15], [2,5], [1,24], [2,12], [2,2], // 2070-2079
  [1,22], [2,9], [1,29], [2,17], [2,6], [1,26], [2,14], [2,3], [1,24], [2,10], // 2080-2089
  [1,30], [2,18], [2,7], [1,27], [2,15], [2,5], [1,25], [2,12], [2,1], [1,21], // 2090-2099
  [2,9], // 2100
]

export const baseLunarYear = 1900

/**
 * 获取农历某年闰月的月份，月份从1开始（0表示无闰月）。
 */
export function getLunarLeapMonth(year: number) {
  return lunarInfo[year - baseLunarYear] & 0xf
}

/**
 * 获取农历某年闰月的天数。
 */
export function getLunarLeapMonthDays(year: number): number {
  if (getLunarLeapMonth(year)) {
    return lunarInfo[year - baseLunarYear] & 0x10000 ? 30 : 29
  }
  return 0
}

/**
 * 获取农历某年的总天数。
 */
export function getLunarYearDays(year: number) {
  let sum = 348 // 29天*12个月
  const info = lunarInfo[year - baseLunarYear]

  // 加上大月的天数
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += info & i ? 1 : 0
  }

  // 加上闰月的天数
  return sum + getLunarLeapMonthDays(year)
}

/**
 * 获取农历某年某月的天数，月份从1开始。
 */
export function getLunarMonthDays(year: number, month: number): number {
  return lunarInfo[year - baseLunarYear] & (0x10000 >> month) ? 30 : 29
}

/**
 * 公历转农历，月份从1开始（返回的闰月为负数）。
 */
export function solarToLunar(year: number, month: number, day: number) {
  // 计算输入日期与基准日期的天数差
  const offsetDays = Math.floor(
    (Date.UTC(year, month - 1, day) - Date.UTC(baseLunarYear, 0, 31)) /
      (24 * 60 * 60 * 1000),
  )

  // 农历年、月、日初始化
  let lunarYear = baseLunarYear
  let lunarMonth = 1
  let lunarDay = 1
  let isLeapMonth = false
  let daysRemaining = offsetDays

  // 计算农历年
  while (true) {
    const yearDays = getLunarYearDays(lunarYear)
    if (daysRemaining < yearDays) {
      break
    }
    daysRemaining -= yearDays
    lunarYear++
  }

  // 计算农历月和日
  const leapMonth = getLunarLeapMonth(lunarYear)
  let monthDays = 0
  let _month = 1

  for (; _month <= 12; _month++) {
    // 处理闰月
    if (leapMonth > 0 && _month === leapMonth + 1) {
      monthDays = getLunarLeapMonthDays(lunarYear)

      if (daysRemaining < monthDays) {
        isLeapMonth = true
        _month--
        break
      }
      daysRemaining -= monthDays
    }

    monthDays = getLunarMonthDays(lunarYear, _month)

    if (daysRemaining < monthDays) {
      break
    }
    daysRemaining -= monthDays
  }

  lunarMonth = _month
  lunarDay = daysRemaining + 1

  return {
    year: lunarYear,
    month: lunarMonth * (isLeapMonth ? -1 : 1),
    day: lunarDay,
  }
}

/**
 * 农历转公历（闰月需传递负数）。
 */
export function lunarToSolar(year: number, month: number, day: number) {
  const springFestival = springFestivals[year - baseLunarYear]

  const solarDate = new Date(year, springFestival[0] - 1, springFestival[1])

  const info = lunarInfo[year - baseLunarYear]
  const leapMonth = info & 0xf

  let totalDays = 0
  const absMonth = Math.abs(month)

  for (let m = 1; m < absMonth; m++) {
    if (m === leapMonth) {
      totalDays += getLunarLeapMonthDays(year)
    }

    totalDays += getLunarMonthDays(year, m)
  }

  if (month < 0) {
    totalDays += getLunarMonthDays(year, absMonth)
  }

  totalDays += day - 1

  solarDate.setDate(solarDate.getDate() + totalDays)

  return {
    year: solarDate.getFullYear(),
    month: solarDate.getMonth() + 1,
    day: solarDate.getDate(),
  }
}

// 农历年份的名称
// prettier-ignore
export const lunarYearNames = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

/**
 * 将阿拉伯数字的年份转为汉字数字年份
 */
export function getLunarYearName(year: number) {
  return (
    String(year)
      .split('')
      .map((item) => lunarYearNames[+item])
      .join('') + '年'
  )
}

// 农历月份的名称
// prettier-ignore
export const lunarMonthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']

/**
 * 获取农历月份名称，月份从1开始，例如：正月，十月，腊月。
 */
export function getLunarMonthName(month: number, isLeapMonth?: boolean) {
  return (isLeapMonth ? '闰' : '') + lunarMonthNames[month - 1] + '月'
}

// 农历日期的名称
// prettier-ignore
export const lunarDayNames = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']

/**
 * 获取农历日期名称，例如：初一，十二，廿一。
 */
export function getLunarDayName(day: number) {
  return lunarDayNames[day - 1]
}

// 十天干
// prettier-ignore
export const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 十二地支
// prettier-ignore
export const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

/**
 * 获取农历时辰名称，例如：子初、子正、午初，午正。
 */
export function getLunarHourName(hour: number) {
  const index = Math.floor(((hour === 23 ? 0 : hour) + 1) / 2) % 12

  return earthlyBranches[index] + (hour % 2 === 1 ? '初' : '正')
}
