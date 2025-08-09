import { type StyleValue } from 'vue'
import { type CalendarProps } from '../calendar/common'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export interface CalendarPopoutProps extends CalendarProps {
  visible?: boolean
  title?: string
  showConfirm?: boolean
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
  resettable?: boolean
}

export const defaultCalendarPopoutProps = () => ({
  ...defaultConfig.calendar,
  ...defaultConfig.calendarPopout,
})

export interface CalendarPopoutSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  'title-prepend'?(props: Record<string, never>): any
}

export interface CalendarPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (
    e: 'update:model-value',
    value: Date | Date[] | string | string[] | undefined,
  ): void
  (e: 'change', value: Date | Date[] | string | string[] | undefined): void
  (e: 'confirm'): void
}

export interface CalendarPopoutExpose {}
