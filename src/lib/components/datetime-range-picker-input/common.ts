import { defaultConfig } from '../config'
import { type DatetimeRangePickerProps } from '../datetime-range-picker/common'
import { type PopoutInputProps } from '../popout-input/common'
import { type StyleValue } from 'vue'

export interface DatetimeRangePickerInputProps
  extends DatetimeRangePickerProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  visible?: boolean
  title?: string
  outletFormat?: string
  valueFormat?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultDatetimeRangePickerInputProps = () => ({
  ...defaultConfig.datetimeRangePicker,
  ...defaultConfig.datetimeRangePickerInput,
})

export interface DatetimeRangePickerInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', date: (Date | string)[] | undefined): void
  (e: 'change', date: (Date | string)[] | undefined): void
}
