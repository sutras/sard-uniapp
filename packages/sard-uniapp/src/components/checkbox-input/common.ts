import { type CheckboxGroupProps } from '../checkbox/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'

export interface CheckboxInputOption {
  [key: PropertyKey]: any
}

export interface CheckboxInputProps
  extends CheckboxGroupProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
}

export const checkboxInputPropsDefaults = {
  ...defaultConfig.checkboxInput,
  options: () => [],
}

export interface CheckboxInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
}
