import { defaultConfig } from '../config'
import {
  type DatetimeRangePickerPopoutProps,
  type DatetimeRangePickerPopoutEmits,
} from '../datetime-range-picker-popout/common'
import { type PopoutInputProps } from '../popout-input/common'

export interface DatetimeRangePickerInputProps
  extends DatetimeRangePickerPopoutProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  outletFormat?: string
}

export const defaultDatetimeRangePickerInputProps = () => ({
  ...defaultConfig.datetimeRangePicker,
  ...defaultConfig.datetimeRangePickerPopout,
})

export interface DatetimeRangePickerInputEmits
  extends DatetimeRangePickerPopoutEmits {}
