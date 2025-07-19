import { type StyleValue } from 'vue'
import {
  type DatetimePickerProps,
  type DatetimePickerSlots,
} from '../datetime-picker/common'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

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

export interface DatetimePickerPopoutSlots extends DatetimePickerSlots {}

export interface DatetimePickerPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', date: Date | string | undefined): void
  (e: 'change', date: Date | string | undefined): void
  (e: 'confirm'): void
}

export interface DatetimePickerPopoutExpose {}
