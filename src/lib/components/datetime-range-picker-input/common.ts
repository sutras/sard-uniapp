import { defaultConfig } from '../config'
import {
  type DatetimeRangePickerPopoutProps,
  type DatetimeRangePickerPopoutSlots,
  type DatetimeRangePickerPopoutEmits,
} from '../datetime-range-picker-popout/common'
import { type PopoutInputProps } from '../popout-input/common'

export interface DatetimeRangePickerInputProps
  extends DatetimeRangePickerPopoutProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  outletFormat?: string
  valueOnClear?: () => any
}

export const defaultDatetimeRangePickerInputProps = () => ({
  ...defaultConfig.datetimeRangePicker,
  ...defaultConfig.datetimeRangePickerPopout,
  ...defaultConfig.datetimeRangePickerInput,
})

export interface DatetimeRangePickerInputSlots
  extends DatetimeRangePickerPopoutSlots {}

export interface DatetimeRangePickerInputEmits
  extends DatetimeRangePickerPopoutEmits {}
