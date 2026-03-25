import {
  type CalendarPopoutEmits,
  type CalendarPopoutProps,
} from '../calendar-popout/common'
import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'
import { type DefaultProps, defaultConfig } from '../config'

export interface CalendarInputProps
  extends CalendarPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  outletFormat?: string
  valueOnClear?: () => any
}

export const defaultCalendarInputProps =
  (): DefaultProps<CalendarInputProps> => ({
    type: 'single',
    maxDays: Number.MAX_SAFE_INTEGER,
    weekStartsOn: 0,
    ...defaultConfig.calendar,
    showConfirm: true,
    validateEvent: true,
    ...defaultConfig.calendarPopout,
    outletFormat: 'YYYY-MM-DD',
    ...defaultConfig.calendarInput,
  })

export interface CalendarInputSlots extends PopoutInputSlots {}

export interface CalendarInputEmits extends CalendarPopoutEmits {}
