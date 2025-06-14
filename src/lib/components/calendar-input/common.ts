import {
  type CalendarPopoutEmits,
  type CalendarPopoutProps,
} from '../calendar-popout/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'

export interface CalendarInputProps
  extends CalendarPopoutProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  outletFormat?: string
  valueOnClear?: () => any
}

export const defaultCalendarInputProps = () => ({
  ...defaultConfig.calendar,
  ...defaultConfig.calendarPopout,
  ...defaultConfig.calendarInput,
})

export interface CalendarInputEmits extends CalendarPopoutEmits {}
