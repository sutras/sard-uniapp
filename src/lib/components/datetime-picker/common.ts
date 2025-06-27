import { type StyleValue } from 'vue'
import {
  formatDate,
  getLunarDayName,
  getLunarLeapMonth,
  getLunarLeapMonthDays,
  getLunarMonthDays,
  getLunarMonthName,
  getMonthDays,
  isDate,
  minmax,
  solarToLunar,
  toDate,
} from '../../utils'
import { defaultConfig } from '../config'
import { type PickerSlots } from '../picker/common'

export interface DatetimePickerProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: string
  calendar?: 'solar' | 'lunar'
  min?: Date | string
  max?: Date | string
  modelValue?: Date | string
  filter?: (
    letter: DatetimeLetter,
    value: number,
    date: Date,
    index: number,
  ) => boolean
  formatter?: (
    letter: DatetimeLetter,
    option: DatetimeColumnOption,
    date: Date,
    index: number,
  ) => string | void | undefined
  valueFormat?: string
}

export const defaultDatetimePickerProps = defaultConfig.datetimePicker

export interface DatetimePickerSlots extends PickerSlots {}

export interface DatetimePickerEmits {
  (e: 'update:model-value', date: Date | string): void
  (e: 'change', date: Date | string): void
}

export interface DatetimeColumnOption {
  value: number
  label?: string
  zerofill?: string
  [key: PropertyKey]: any
}

export type DatetimeLetter = 'y' | 'M' | 'd' | 'h' | 'm' | 's'

export type DateEvery = [number, number, number, number, number, number]

export const getMinDate = () => {
  return new Date(new Date().getFullYear() - 10, 0, 1, 0, 0, 0)
}

export const getMaxDate = () => {
  return new Date(new Date().getFullYear() + 10, 11, 31, 23, 59, 59)
}

interface Strategies {
  [p: string]: [
    index: number,
    length: number,
    min: number | null,
    max: number | null,
    getter: (date: Date) => number,
    setter: (date: Date, value: number) => number,
  ]
}

export const strategies: Strategies = {
  y: [0, 4, 0, 0, (d) => d.getFullYear(), (d, val) => d.setFullYear(val)],
  M: [1, 2, 1, 12, (d) => d.getMonth() + 1, (d, val) => d.setMonth(val - 1)],
  d: [2, 2, 1, 31, (d) => d.getDate(), (d, val) => d.setDate(val)],
  h: [3, 2, 0, 23, (d) => d.getHours(), (d, val) => d.setHours(val)],
  m: [4, 2, 0, 59, (d) => d.getMinutes(), (d, val) => d.setMinutes(val)],
  s: [5, 2, 0, 59, (d) => d.getSeconds(), (d, val) => d.setSeconds(val)],
}

export const letterArray: DatetimeLetter[] = ['y', 'M', 'd', 'h', 'm', 's']

function getSolarBoundaryValue(
  isMax: boolean,
  endDate: Date,
  currentDate: Date,
) {
  const currEvery = [endDate.getFullYear()]
  const minOrMaxIndex = isMax ? 3 : 2
  let aside = true
  let prevGetter = strategies.y[4]

  letterArray.slice(1).forEach((letter, index) => {
    const strategy = strategies[letter]
    let minOrMax = strategy[minOrMaxIndex] as number
    if (isMax && letter === 'd') {
      minOrMax = getMonthDays(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
      )
    }
    aside = aside && currEvery[index] === prevGetter(currentDate)

    currEvery[index + 1] = aside ? strategy[4](endDate) : minOrMax
    prevGetter = strategy[4]
  })

  return currEvery
}

function getLunarBoundaryValue(
  isMax: boolean,
  endDate: Date,
  currentDate: Date,
) {
  const lunarDate = solarToLunar(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  )
  const lunarEndDate = solarToLunar(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    endDate.getDate(),
  )

  const currEvery = [lunarEndDate.year]
  const minOrMaxIndex = isMax ? 3 : 2
  let aside = true
  let prevGetter = strategies.y[4]

  letterArray.slice(1).forEach((letter, index) => {
    const prevValue = currEvery[index]
    const strategy = strategies[letter]
    const currGetter = strategy[4]
    let minOrMax = strategy[minOrMaxIndex] as number
    if (isMax && letter === 'd') {
      minOrMax =
        lunarDate.month < 0
          ? getLunarLeapMonthDays(lunarDate.year)
          : getLunarMonthDays(lunarDate.year, lunarDate.month)
    }

    let asideValue = 0

    if (aside) {
      if (letter === 'M') {
        aside = lunarDate.year === prevValue
        if (aside) {
          asideValue = lunarEndDate.month
        }
      } else if (letter === 'd') {
        aside = lunarDate.month === prevValue
        if (aside) {
          asideValue = lunarEndDate.day
        }
      } else {
        aside = prevGetter(currentDate) === prevValue
        if (aside) {
          asideValue = currGetter(currentDate)
        }
      }
    }

    currEvery[index + 1] = aside ? asideValue : minOrMax
    prevGetter = currGetter
  })

  return currEvery
}

export function getBoundaryValue(
  calendar: 'solar' | 'lunar',
  isMax: boolean,
  endDate: Date,
  currentDate: Date,
) {
  return calendar === 'solar'
    ? getSolarBoundaryValue(isMax, endDate, currentDate)
    : getLunarBoundaryValue(isMax, endDate, currentDate)
}

export function correctSolarDate(
  date: DateEvery,
  minDate: Date,
  maxDate: Date,
) {
  let minAside = true
  let maxAside = true

  let prevGetter = strategies.y[4]
  letterArray.slice(1).forEach((letter, index) => {
    const strategy = strategies[letter]
    let minValue = strategy[2] as number
    let maxValue = strategy[3] as number
    if (letter === 'd') {
      maxValue = getMonthDays(date[0], date[1])
    }

    const currGetter = strategy[4]
    if ((minAside = minAside && prevGetter(minDate) === date[index])) {
      minValue = currGetter(minDate)
    }
    if ((maxAside = maxAside && prevGetter(maxDate) === date[index])) {
      maxValue = currGetter(maxDate)
    }
    date[index + 1] = minmax(date[index + 1], minValue, maxValue)

    prevGetter = currGetter
  })
}

export function correctLunarDate(
  date: DateEvery,
  minDate: Date,
  maxDate: Date,
) {
  const lunarMinDate = solarToLunar(
    minDate.getFullYear(),
    minDate.getMonth() + 1,
    minDate.getDate(),
  )
  const lunarMaxDate = solarToLunar(
    maxDate.getFullYear(),
    maxDate.getMonth() + 1,
    maxDate.getDate(),
  )

  const range = [
    {
      value: 0,
      edge: true,
      date: minDate,
      lunarDate: lunarMinDate,
    },
    {
      value: 0,
      edge: true,
      date: maxDate,
      lunarDate: lunarMaxDate,
    },
  ]

  let prevGetter = strategies.y[4]
  letterArray.slice(1).forEach((letter, index) => {
    const prevValue = date[index]
    const currIndex = index + 1
    const currValue = date[currIndex]

    const strategy = strategies[letter]
    range[0].value = strategy[2] as number
    range[1].value = strategy[3] as number
    if (letter === 'd') {
      range[1].value =
        date[1] < 0
          ? getLunarLeapMonthDays(date[0])
          : getLunarMonthDays(date[0], date[1])
    }

    let currGetter = strategy[4]

    range.forEach((point) => {
      if (point.edge) {
        if (letter === 'M') {
          point.edge = point.lunarDate.year === prevValue
          if (point.edge) {
            point.value = point.lunarDate.month
          }
        } else if (letter === 'd') {
          point.edge = point.lunarDate.month === prevValue
          if (point.edge) {
            point.value = point.lunarDate.day
          }
        } else {
          point.edge = prevGetter(point.date) === prevValue
          if (point.edge) {
            point.value = currGetter(point.date)
          }
        }
      }
    })

    if (letter === 'M') {
      let min = range[0].value
      let max = range[1].value
      let value = currValue

      if (min < 0) {
        min = Math.abs(min) + 0.5
      } else if (max < 0) {
        max = Math.abs(max) + 0.5
      }
      if (value < 0) {
        value = Math.abs(value) + 0.5
      }

      value = minmax(value, min, max)
      date[currIndex] = value % 1 === 0.5 ? ~~value * -1 : value
    } else {
      date[currIndex] = minmax(currValue, range[0].value, range[1].value)
    }

    if (letter === 'd') {
      currGetter = (date: Date) => {
        return date === minDate ? lunarMinDate.day : lunarMaxDate.day
      }
    }

    prevGetter = currGetter
  })
}

export function correctDate(
  calendar: 'solar' | 'lunar',
  date: DateEvery,
  minDate: Date,
  maxDate: Date,
) {
  if (calendar === 'solar') {
    correctSolarDate(date, minDate, maxDate)
  } else {
    correctLunarDate(date, minDate, maxDate)
  }
}

export const getColumnData = (
  calendar: 'solar' | 'lunar',
  min: number,
  max: number,
  length: number,
  letter: DatetimeLetter,
  currentDate: Date,
  translate: (...args: any[]) => any,
  filter?: (
    letter: DatetimeLetter,
    value: number,
    date: Date,
    index: number,
  ) => boolean,
  formatter?: (
    letter: DatetimeLetter,
    option: DatetimeColumnOption,
    date: Date,
    index: number,
  ) => string | void | undefined,
) => {
  const lunarDate = solarToLunar(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  )

  let column = Array(Math.abs(max) - Math.abs(min) + 1)
    .fill(0)
    .map(
      (_, i) =>
        ({
          value: i + Math.abs(min),
        }) as DatetimeColumnOption,
    )

  if (calendar === 'lunar' && letter === 'M') {
    if (min < 0) {
      column[0].value = min
    } else if (max < 0) {
      column.push({
        value: max,
      })
    } else {
      const leapMonth = getLunarLeapMonth(lunarDate.year)
      if (leapMonth > 0 && leapMonth > min && leapMonth < max) {
        column.splice(
          column.findIndex((item) => item.value === leapMonth) + 1,
          0,
          {
            value: -leapMonth,
          },
        )
      }
    }
  }

  if (filter) {
    column = column.filter((option, i) =>
      filter(letter, option.value, currentDate, i),
    )
  }
  column.forEach((option) => {
    option.zerofill = String(option.value).padStart(length, '0')
    if (calendar === 'solar') {
      option.label = option.zerofill + translate(letter)
    } else {
      switch (letter) {
        case 'M':
          option.label = getLunarMonthName(
            Math.abs(option.value),
            option.value < 0,
          )
          break
        case 'd':
          option.label = getLunarDayName(option.value)
          break
        default:
          option.label = option.zerofill + translate(letter)
          break
      }
    }
  })
  if (formatter) {
    column.forEach((option, i) => {
      option.label = formatter(letter, option, currentDate, i) ?? option.label
    })
  }
  return column
}

export function getInitialValue(minDate: Date, maxDate: Date) {
  const value = new Date()
  return value.getTime() < minDate.getTime()
    ? new Date(minDate)
    : value.getTime() > maxDate.getTime()
      ? new Date(maxDate)
      : value
}

export const normalizeRangeValue = (
  minDate: Date,
  maxDate: Date,
  value?: (string | Date)[],
  valueFormat?: string,
) => {
  const [start, end] = value || []
  const startValue = start || getInitialValue(minDate, maxDate)
  const endValue =
    end || getInitialValue(toDate(startValue, valueFormat), maxDate)

  return [
    valueFormat && isDate(startValue)
      ? formatDate(startValue, valueFormat)
      : startValue,
    valueFormat && isDate(endValue)
      ? formatDate(endValue, valueFormat)
      : endValue,
  ]
}
