import { type StyleValue } from 'vue'
import {
  type DatetimeRangePickerProps,
  type DatetimeRangePickerSlots,
} from '../datetime-range-picker/common'
import { defaultConfig } from '../config'

export interface DatetimeRangePickerPopoutProps
  extends DatetimeRangePickerProps {
  visible?: boolean
  title?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultDatetimeRangePickerInputProps = () => ({
  ...defaultConfig.datetimeRangePicker,
  ...defaultConfig.datetimeRangePickerPopout,
})

export interface DatetimeRangePickerPopoutSlots
  extends DatetimeRangePickerSlots {}

export interface DatetimeRangePickerPopoutEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', date: (Date | string)[] | undefined): void
  (e: 'change', date: (Date | string)[] | undefined): void
}

export interface DatetimeRangePickerPopoutExpose {}
