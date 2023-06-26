// 获取一个月中的天数
export function getDaysInMonth(year: number, month: number) {
  if (month === 2) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
  } else {
    return [4, 6, 9, 11].includes(month) ? 30 : 31
  }
}

// 获取一个月中一号对应的星期
export function getWeekOnFirstDay(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay()
}

// 获取 Date 中的总天数
export function getDaysInDate(date: Date) {
  return Math.floor(date.getTime() / 1000 / 60 / 60 / 24)
}

// 把日期转换为年月日数值
export function toDateNumber(date: Date) {
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()
}

// 根据传入的占位符返回格式化后的日期
export function formatDate(date: Date, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  const regexp = /YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS/g

  const matches = {
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

  return formatStr.replace(regexp, (match) => {
    return matches[match](date)
  })
}

// 限定日期范围
export const minmaxDate = (date: Date, minDate: Date, maxDate: Date) => {
  const dateTime = date.getTime()
  const minDateTime = minDate.getTime()
  const maxDateTime = maxDate.getTime()

  if (dateTime < minDateTime) {
    return new Date(minDateTime)
  } else if (dateTime > maxDateTime) {
    return new Date(maxDateTime)
  }
  return date
}
