import { type CalendarProps } from '../calendar/common'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'

export interface CalendarPopoutProps extends FormPopoutProps, CalendarProps {}

export const defaultCalendarPopoutProps =
  (): DefaultProps<CalendarPopoutProps> => ({
    type: 'single',
    maxDays: Number.MAX_SAFE_INTEGER,
    weekStartsOn: 0,
    ...defaultConfig.calendar,
    showConfirm: true,
    validateEvent: true,
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
