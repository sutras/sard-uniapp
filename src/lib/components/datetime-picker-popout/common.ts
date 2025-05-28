import { type StyleValue } from 'vue'
import { type DatetimePickerProps } from '../datetime-picker/common'
import { defaultConfig } from '../config'

export interface DatetimePickerPopoutProps extends DatetimePickerProps {
  visible?: boolean
  title?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultDatetimePickerPopoutProps = () => ({
  ...defaultConfig.datetimePicker,
  ...defaultConfig.datetimePickerPopout,
})

export interface DatetimePickerPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface DatetimePickerPopoutEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', date: Date | string | undefined): void
  (e: 'change', date: Date | string | undefined): void
}

export interface DatetimePickerPopoutExpose {}
