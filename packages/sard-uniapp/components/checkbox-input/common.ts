import { type CheckboxGroupOption } from '../checkbox/common'
import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'
import {
  type CheckboxPopoutEmits,
  type CheckboxPopoutProps,
  defaultCheckboxPopoutProps,
} from '../checkbox-popout/common'
import { defaultConfig } from '../config'

export type CheckboxInputOption = CheckboxGroupOption

export interface CheckboxInputProps
  extends CheckboxPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  valueOnClear?: () => any
}

export const defaultCheckboxInputProps = () => ({
  ...defaultCheckboxPopoutProps(),
  ...defaultConfig.checkboxInput,
})

export interface CheckboxInputSlots extends PopoutInputSlots {}

export interface CheckboxInputEmits extends CheckboxPopoutEmits {}
