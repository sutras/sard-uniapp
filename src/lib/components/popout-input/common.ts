import { type StyleValue } from 'vue'

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
}

export interface PopoutInputEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
}

export interface PopoutInputSlots {
  'arrow'(): any
}
