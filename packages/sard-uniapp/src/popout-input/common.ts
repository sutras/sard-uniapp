import { type PropType, type StyleValue } from 'vue'

export interface PopoutInputProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<PopoutInputProps>(), {
//   validateEvent: true,
// })

export const popoutInputProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: null,
  readonly: Boolean,
  disabled: Boolean,
  clearable: Boolean,
  placeholder: String,
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export interface PopoutInputEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: string): void
  (e: 'clear'): void
}
