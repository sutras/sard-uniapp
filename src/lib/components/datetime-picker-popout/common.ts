import {
  type DatetimePickerProps,
  type DatetimePickerSlots,
} from '../datetime-picker/common'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'

export interface DatetimePickerPopoutProps
  extends FormPopoutProps,
    DatetimePickerProps {}

export const defaultDatetimePickerPopoutProps =
  (): DefaultProps<DatetimePickerPopoutProps> => ({
    type: 'yMd',
    calendar: 'solar',
    ...defaultConfig.datetimePicker,
    validateEvent: true,
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
