import { type StyleValue } from 'vue'
import {
  type DatetimeRangePickerProps,
  type DatetimeRangePickerSlots,
} from '../datetime-range-picker/common'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export interface DatetimeRangePickerPopoutProps
  extends DatetimeRangePickerProps {
  visible?: boolean
  title?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
  resettable?: boolean
}

export const defaultDatetimeRangePickerInputProps = () => ({
  ...defaultConfig.datetimeRangePicker,
  ...defaultConfig.datetimeRangePickerPopout,
})

export interface DatetimeRangePickerPopoutSlots
  extends DatetimeRangePickerSlots {}

export interface DatetimeRangePickerPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', date: (Date | string)[] | undefined): void
  (e: 'change', date: (Date | string)[] | undefined): void
  (e: 'confirm'): void
}

export interface DatetimeRangePickerPopoutExpose {}
