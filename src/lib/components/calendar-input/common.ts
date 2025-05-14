import { type CalendarProps } from '../calendar/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'
import { type StyleValue } from 'vue'

export interface CalendarInputProps
  extends CalendarProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  visible?: boolean
  title?: string
  showConfirm?: boolean
  outletFormat?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultCalendarInputProps = () => ({
  ...defaultConfig.calendarInput,
  ...defaultConfig.calendar,
})

export interface CalendarInputEmits {
  (e: 'update:visible', visible: boolean): void
  (
    e: 'update:model-value',
    value: Date | Date[] | string | string[] | undefined,
  ): void
  (e: 'change', value: Date | Date[] | string | string[] | undefined): void
}
