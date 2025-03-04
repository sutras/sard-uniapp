import { type StyleValue } from 'vue'
import { getDaysInMonth, minmax } from '../../utils'
import { defaultConfig } from '../config'

export interface DatetimePickerProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: string
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

export function getBoundaryValue(
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
      minOrMax = getDaysInMonth(
        currentDate.getFullYear(),
        currentDate.getMonth(),
      )
    }
    aside = aside && currEvery[index] === prevGetter(currentDate)

    currEvery[index + 1] = aside ? strategy[4](endDate) : minOrMax
    prevGetter = strategy[4]
  })

  return currEvery
}

export function correctDate(date: DateEvery, minDate: Date, maxDate: Date) {
  let minAside = true
  let maxAside = true

  let prevGetter = strategies.y[4]
  letterArray.slice(1).forEach((letter, index) => {
    const strategy = strategies[letter]
    let minValue = strategy[2] as number
    let maxValue = strategy[3] as number
    if (letter === 'd') {
      maxValue = getDaysInMonth(date[0], date[1] - 1)
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

export const getColumnData = (
  count: number,
  start: number,
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
  let column = Array(count)
    .fill(0)
    .map(
      (_, i) =>
        ({
          value: i + start,
        } as DatetimeColumnOption),
    )

  if (filter) {
    column = column.filter((option, i) =>
      filter(letter, option.value, currentDate, i),
    )
  }
  column.forEach((option) => {
    option.zerofill = String(option.value).padStart(length, '0')
    option.label = option.zerofill + translate(letter)
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
    ? minDate
    : value.getTime() > maxDate.getTime()
    ? maxDate
    : value
}
