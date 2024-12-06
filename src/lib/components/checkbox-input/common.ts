import {
  type CheckboxGroupOption,
  type CheckboxGroupProps,
} from '../checkbox/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'

export type CheckboxInputOption = CheckboxGroupOption

export interface CheckboxInputProps
  extends CheckboxGroupProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
}

export const defaultCheckboxInputProps = {
  ...defaultConfig.checkboxInput,
  options: () => [],
}

export interface CheckboxInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
}
