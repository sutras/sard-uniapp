import { defaultPickerProps, type PickerProps } from '../picker/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'
import { type StyleValue } from 'vue'

export interface PickerInputProps
  extends PickerProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultPickerInputProps = () => ({
  ...defaultPickerProps(),
  ...defaultConfig.pickerInput,
})

export interface PickerInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}
