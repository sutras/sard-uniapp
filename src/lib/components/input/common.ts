import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface InputProps {
  placeholder?: string
  placeholderStyle?: string
  placeholderClass?: string
  disabled?: boolean
  maxlength?: number
  focus?: boolean
  cursorSpacing?: number
  cursor?: number
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  confirmHold?: boolean
  selectionStart?: number
  selectionEnd?: number
  adjustPosition?: boolean
  holdKeyboard?: boolean
  autoBlur?: boolean
  ignoreCompositionEvent?: boolean
  inputmode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url'

  // textarea
  autoHeight?: boolean
  fixed?: boolean
  showConfirmBar?: boolean
  disableDefaultPadding?: boolean
  inputMinHeight?: boolean

  // input
  type?:
    | 'text'
    | 'number'
    | 'idcard'
    | 'digit'
    | 'tel'
    | 'safe-password'
    | 'nickname'
    // custom
    | 'password'
    | 'textarea'
  alwaysEmbed?: boolean
  safePasswordCertPath?: string
  safePasswordLength?: string
  safePasswordTimeStamp?: string
  safePasswordNonce?: string
  safePasswordSalt?: string
  safePasswordCustomHash?: string
  randomNumber?: boolean
  controlled?: boolean
  alwaysSystem?: boolean

  // custom
  rootClass?: string
  rootStyle?: StyleValue
  modelValue?: string | number
  clearable?: boolean
  showClearOnlyFocus?: boolean
  showCount?: boolean
  inlaid?: boolean
  borderless?: boolean
  readonly?: boolean
  focused?: boolean
  minHeight?: string
  validateEvent?: boolean
  showEye?: boolean

  internalPrepend?: number
}

export const defaultInputProps = defaultConfig.input

export interface InputSlots {
  prepend?(props: Record<string, never>): any
  append?(props: Record<string, never>): any
  addon?(props: Record<string, never>): any
}

export interface InputEmits {
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'clear'): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
  (e: 'linechange', event: any): void
  (e: 'confirm', event: any): void
  (e: 'keyboardheightchange', event: any): void
  (e: 'click', event: any): void
}
