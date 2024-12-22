import { type StyleValue } from 'vue'
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

export const defaultPasswordInputProps = defaultConfig.passwordInput

export interface PasswordInputEmits {
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'updat:focused', focused: boolean): void
}
