import { type PopoutInputProps } from '../popout-input/common'
import {
  defaultPickerPopoutProps,
  type PickerPopoutSlots,
  type PickerPopoutEmits,
  type PickerPopoutProps,
} from '../picker-popout/common'

export interface PickerInputProps
  extends PickerPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {}

export const defaultPickerInputProps = () => ({
  ...defaultPickerPopoutProps(),
})

export interface PickerInputSlots extends PickerPopoutSlots {}

export interface PickerInputEmits extends PickerPopoutEmits {}
