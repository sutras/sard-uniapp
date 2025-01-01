import { type StyleValue } from 'vue'
import { type LocaleTranslate } from '../locale'
import { type Bem } from '../../utils'
import { defaultConfig } from '../config'

export type CalendarType = 'single' | 'multiple' | 'range'

export interface CalendarDay {
  date: Date
  disabled: boolean
  type: 'same' | 'start' | 'middle' | 'end' | 'selected' | 'normal'
  top: string
  text: string | number
  bottom: string
  className?: string
  style?: StyleValue
}

export interface CalendarProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: CalendarType
  modelValue?: Date | Date[] | string | string[]
  min?: Date
  max?: Date
  currentDate?: Date
  disabledDate?: (date: Date) => boolean
  maxDays?: number
  overMaxDays?: () => void
  weekStartsOn?: number
  formatter?: (day: CalendarDay) => void
  allowSameDay?: boolean
  severalMonths?: boolean
  valueFormat?: string
}

export const defaultCalendarProps = defaultConfig.calendar

export interface CalendarEmits {
  (e: 'update:model-value', value: Date | Date[] | string | string[]): void
  (e: 'change', value: Date | Date[] | string | string[]): void
}

export interface CalendarMonthProps {
  year: number
  month: number
  type: CalendarType
  minDate: Date
  maxDate: Date
  currentDates: Date[]
  formatter?: (day: CalendarDay) => void
  disabledDate?: (date: Date) => boolean
  todayNumber: number
  weekStartsOn: number
  severalMonths?: boolean
  t: LocaleTranslate
  bem: Bem
}

export interface CalendarMonthEmits {
  (e: 'day-click', date: Date): void
}

export const getMinDate = (severalMonths?: boolean) => {
  const date = new Date()
  if (severalMonths) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }
  return new Date(date.getFullYear() - 10, 0, 1)
}

export const getMaxDate = (severalMonths?: boolean) => {
  const date = new Date()
  if (severalMonths) {
    return new Date(date.getFullYear(), date.getMonth() + 3, 0)
  }
  return new Date(date.getFullYear() + 10, 11, 31)
}

export const sortDates = (dates: Date[]) => {
  return dates.sort((a, b) => a.getTime() - b.getTime())
}

export const weeksIndex = [0, 1, 2, 3, 4, 5, 6]
