import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type InputProps } from '../input'
export interface PopoutInputProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  loading?: boolean
  multiline?: boolean
  arrow?: string
  arrowFamily?: string
  internalArrow?: number
  inputProps?: InputProps
}

export const defaultPopoutInputProps = defaultConfig.popoutInput

export interface PopoutInputEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
}

export interface PopoutInputSlots {
  'arrow'(): any
}
