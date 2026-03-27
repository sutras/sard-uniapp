import {
  type DatetimeRangePickerProps,
  type DatetimeRangePickerSlots,
} from '../datetime-range-picker/common'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'

export interface DatetimeRangePickerPopoutProps
  extends FormPopoutProps,
    DatetimeRangePickerProps {}

export const defaultDatetimeRangePickerPopoutProps =
  (): DefaultProps<DatetimeRangePickerPopoutProps> => ({
    type: 'yMd',
    ...defaultConfig.datetimeRangePicker,
    validateEvent: true,
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
