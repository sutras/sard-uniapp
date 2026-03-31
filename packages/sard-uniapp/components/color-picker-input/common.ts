import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'
import {
  defaultColorPickerPopoutProps,
  type ColorPickerPopoutProps,
  type ColorPickerPopoutEmits,
} from '../color-picker-popout/common'
import { type DefaultProps, defaultConfig } from '../config'

export interface ColorPickerInputProps
  extends ColorPickerPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  valueOnClear?: () => any
}

export const defaultColorPickerInputProps =
  (): DefaultProps<ColorPickerInputProps> => ({
    ...defaultColorPickerPopoutProps(),
    ...defaultConfig.colorPickerInput,
  })

export interface ColorPickerInputSlots extends PopoutInputSlots {}

export interface ColorPickerInputEmits extends ColorPickerPopoutEmits {}

export interface ColorPickerInputExpose {}
