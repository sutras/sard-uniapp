import { type PropType, type StyleValue } from 'vue'

export interface PopoutInputProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  loading?: boolean
}

export const popoutInputProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: null,
  readonly: Boolean,
  disabled: Boolean,
  clearable: Boolean,
  placeholder: String,
  loading: Boolean,
}

export interface PopoutInputEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: string): void
  (e: 'clear'): void
}
