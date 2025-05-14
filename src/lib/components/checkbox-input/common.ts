import {
  type CheckboxGroupOption,
  type CheckboxGroupProps,
} from '../checkbox/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'
import { type StyleValue } from 'vue'

export type CheckboxInputOption = CheckboxGroupOption

export interface CheckboxInputProps
  extends CheckboxGroupProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultCheckboxInputProps = () => ({
  ...defaultConfig.checkboxInput,
  options: () => [],
})

export interface CheckboxInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}
