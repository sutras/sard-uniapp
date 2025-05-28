import { type PopoutInputProps } from '../popout-input/common'
import {
  defaultPickerPopoutProps,
  type PickerPopoutEmits,
  type PickerPopoutProps,
} from '../picker-popout/common'

export interface PickerInputProps
  extends PickerPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {}

export const defaultPickerInputProps = () => ({
  ...defaultPickerPopoutProps(),
})

export interface PickerInputEmits extends PickerPopoutEmits {}
