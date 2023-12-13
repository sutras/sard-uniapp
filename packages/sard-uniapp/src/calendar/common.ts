import { type PropType, type StyleValue } from 'vue'
import { type LocaleTranslate } from '../locale'
import { type Bem } from '../utils'

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
  modelValue?: Date | Date[]
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
}

// const props = withDefaults(defineProps<CalendarProps>(), {
//   type: 'single',
//   maxDays: Number.MAX_SAFE_INTEGER,
//   weekStartsOn: 0,
// })

export const calendarProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<CalendarType>,
    default: 'single',
  },
  modelValue: [Date, Array] as PropType<CalendarProps['modelValue']>,
  min: Date,
  max: Date,
  currentDate: Date,
  disabledDate: Function as PropType<CalendarProps['disabledDate']>,
  maxDays: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  overMaxDays: Function as PropType<CalendarProps['overMaxDays']>,
  weekStartsOn: {
    type: Number,
    default: 0,
  },
  formatter: Function as PropType<CalendarProps['formatter']>,
  allowSameDay: Boolean,
  severalMonths: Boolean,
}

export interface CalendarEmits {
  (e: 'update:model-value', value: Date | Date[]): void
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

export const calendarMonthProps = {
  year: {
    type: Number,
    required: true as const,
  },
  month: {
    type: Number,
    required: true as const,
  },
  type: {
    type: String as PropType<CalendarType>,
    required: true as const,
  },
  minDate: {
    type: Date,
    required: true as const,
  },
  maxDate: {
    type: Date,
    required: true as const,
  },
  currentDates: {
    type: Array as PropType<CalendarMonthProps['currentDates']>,
    required: true as const,
  },
  formatter: Function as PropType<CalendarMonthProps['formatter']>,
  disabledDate: Function as PropType<CalendarMonthProps['disabledDate']>,
  todayNumber: {
    type: Number,
    required: true as const,
  },
  weekStartsOn: {
    type: Number,
    required: true as const,
  },
  severalMonths: Boolean,
  t: {
    type: Function as PropType<CalendarMonthProps['t']>,
    required: true as const,
  },
  bem: {
    type: Object as PropType<CalendarMonthProps['bem']>,
    required: true as const,
  },
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
    return new Date(date.getFullYear(), date.getMonth() + 3, 1)
  }
  return new Date(date.getFullYear() + 10, 11, 31)
}

export const sortDates = (dates: Date[]) => {
  return dates.sort((a, b) => a.getTime() - b.getTime())
}

export const weeksIndex = [0, 1, 2, 3, 4, 5, 6]
