import { type DefaultProps, defaultConfig } from '../config'
import {
  type DatetimeRangePickerPopoutProps,
  type DatetimeRangePickerPopoutSlots,
  type DatetimeRangePickerPopoutEmits,
} from '../datetime-range-picker-popout/common'
import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'

export interface DatetimeRangePickerInputProps
  extends DatetimeRangePickerPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  outletFormat?: string
  valueOnClear?: () => any
}

export const defaultDatetimeRangePickerInputProps =
  (): DefaultProps<DatetimeRangePickerInputProps> => ({
    type: 'yMd',
    ...defaultConfig.datetimeRangePicker,
    validateEvent: true,
    ...defaultConfig.datetimeRangePickerPopout,
    ...defaultConfig.datetimeRangePickerInput,
  })

export interface DatetimeRangePickerInputSlots
  extends DatetimeRangePickerPopoutSlots,
    PopoutInputSlots {}

export interface DatetimeRangePickerInputEmits
  extends DatetimeRangePickerPopoutEmits {}
