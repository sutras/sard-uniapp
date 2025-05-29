import { defaultConfig } from '../config'
import {
  type DatetimePickerSlots,
  type DatetimePickerProps,
} from '../datetime-picker/common'

export interface DatetimeRangePickerProps
  extends Omit<DatetimePickerProps, 'modelValue'> {
  modelValue?: (Date | string)[]
  tabs?: string[]
}

export const defaultDatetimeRangePickerProps = defaultConfig.datetimeRangePicker

export interface DatetimeRangePickerSlots extends DatetimePickerSlots {}

export interface DatetimeRangePickerEmits {
  (e: 'update:model-value', date: (Date | string)[]): void
  (e: 'change', date: (Date | string)[]): void
}
