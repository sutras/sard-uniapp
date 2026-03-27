import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'
import {
  defaultPickerPopoutProps,
  type PickerPopoutSlots,
  type PickerPopoutEmits,
  type PickerPopoutProps,
} from '../picker-popout/common'
import { defaultConfig } from '../config'

export interface PickerInputProps
  extends PickerPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  valueOnClear?: () => any
}

export const defaultPickerInputProps = () => ({
  ...defaultPickerPopoutProps(),
  ...defaultConfig.pickerInput,
})

export interface PickerInputSlots extends PickerPopoutSlots, PopoutInputSlots {}

export interface PickerInputEmits extends PickerPopoutEmits {}
