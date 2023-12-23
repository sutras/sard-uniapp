import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface PasswordInputProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: string
  length?: number
  type?: 'border' | 'underline'
  gap?: number | string
  plainText?: boolean
  focused?: boolean
  customKeyboard?: boolean
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<PasswordInputProps>(), {
//   length: 6,
//   type: 'border',
//   validateEvent: true,
// })

export const passwordInputProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: String,
  length: {
    type: Number,
    default: defaultConfig.passwordInput.length,
  },
  type: {
    type: String as PropType<NonNullable<PasswordInputProps['type']>>,
    default: defaultConfig.passwordInput.type,
  },
  gap: [String, Number],
  plainText: Boolean,
  focused: Boolean,
  customKeyboard: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  validateEvent: {
    type: Boolean,
    default: defaultConfig.passwordInput.validateEvent,
  },
}

export interface PasswordInputEmits {
  (e: 'update:model-value', value: string): void
  (e: 'updat:focused', focused: boolean): void
}
