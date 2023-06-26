<template>
  <view></view>
</template>

<script setup lang="ts">
export interface CalendarDay {
  date: Date
  topInfo: ReactNode
  text: ReactNode
  bottomInfo: ReactNode
  type: 'same' | 'start' | 'middle' | 'end' | 'disabled' | 'selected' | 'normal'
  className?: string
  style?: CSSProperties
}

export interface CalendarBaseProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  min?: Date
  max?: Date
  title?: ReactNode
  disabledDate?: (date: Date) => boolean
  maxDays?: number
  overMaxDays?: () => void
  weekStartsOn?: number
  formatter?: (day: CalendarDay) => void
  allowSameDay?: boolean
}

export interface CalendarSingleProps extends CalendarBaseProps {
  type?: 'single'
  value?: Date
  defaultValue?: Date
  onChange?: (value: Date) => void
}

export interface CalendarMultipleProps extends CalendarBaseProps {
  type?: 'multiple'
  value?: Date[]
  defaultValue?: Date[]
  onChange?: (value: Date[]) => void
}

export interface CalendarRangeProps extends CalendarBaseProps {
  type?: 'range'
  value?: Date[]
  defaultValue?: Date[]
  onChange?: (value: Date[]) => void
}

export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps

const weeks = [0, 1, 2, 3, 4, 5, 6]

const getWeeks = (weekStartsOn: number) => {
  return weeks.slice(weekStartsOn).concat(weeks.slice(0, weekStartsOn))
}

const getOffsetWeek = (week: number, weekStartsOn: number) => {
  return (week - weekStartsOn + 7) % 7
}

const getMinDate = () => {
  return new Date()
}

const getMaxDate = () => {
  const date = new Date()
  date.setMonth(date.getMonth() + 6)
  return date
}

const sortDates = (dates: Date[]) => {
  return dates.sort((a, b) => a.getTime() - b.getTime())
}

export interface CalendarRef {
  scrollToDate: (
    date: Date,
    align: 'start' | 'center' | 'end' | 'nearest',
  ) => void
}
</script>
