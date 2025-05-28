import { type CheckboxGroupOption } from '../checkbox/common'
import { type PopoutInputProps } from '../popout-input/common'
import {
  type CheckboxPopoutEmits,
  type CheckboxPopoutProps,
  defaultCheckboxPopoutProps,
} from '../checkbox-popout/common'

export type CheckboxInputOption = CheckboxGroupOption

export interface CheckboxInputProps
  extends CheckboxPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {}

export const defaultCheckboxInputProps = defaultCheckboxPopoutProps

export interface CheckboxInputEmits extends CheckboxPopoutEmits {}
