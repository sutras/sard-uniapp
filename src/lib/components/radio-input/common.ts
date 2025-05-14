import { type RadioGroupOption, type RadioGroupProps } from '../radio/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'
import { type StyleValue } from 'vue'

export type RadioInputOption = RadioGroupOption

export interface RadioInputProps
  extends RadioGroupProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultRadioInputProps = () => ({
  ...defaultConfig.radioInput,
  options: () => [],
})

export interface RadioInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}
