import { type StyleValue } from 'vue'
import { type DefaultProps } from '../config'

export interface FieldCommonProps {
  value?: string
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
  enableNative?: boolean
  autoBlur?: boolean
}

export interface InputOnlyProps {
  // input
  type?:
    | 'text'
    | 'number'
    | 'idcard'
    | 'digit'
    | 'tel'
    | 'safe-password'
    | 'nickname'
  alwaysEmbed?: boolean
  safePasswordCertPath?: string
  safePasswordLength?: string
  safePasswordTimeStamp?: string
  safePasswordNonce?: string
  safePasswordSalt?: string
  safePasswordCustomHash?: string
  randomNumber?: boolean
  password?: boolean
  controlled?: boolean
  alwaysSystem?: boolean
}

export interface TextareaOnlyProps {
  autoHeight?: boolean
  fixed?: boolean
  showConfirmBar?: boolean
  disableDefaultPadding?: boolean
}

export interface InputNativeProps extends FieldCommonProps, InputOnlyProps {}

export interface TextareaNativeProps
  extends FieldCommonProps,
    TextareaOnlyProps {}

export interface InputBaseProps extends InputNativeProps {
  rootClass?: string
  rootStyle?: StyleValue
}

export interface TextareaBaseProps extends TextareaNativeProps {
  rootClass?: string
  rootStyle?: StyleValue
}

export const defaultInputBaseProps = (): DefaultProps<InputBaseProps> => ({})

export const defaultTextareaBaseProps =
  (): DefaultProps<TextareaBaseProps> => ({})

export interface FieldCommonEmits {
  (e: 'input', value: string): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
  (e: 'confirm', event: any): void
  (e: 'keyboardheightchange', event: any): void
}

export interface InputNativeEmits extends FieldCommonEmits {}

export interface TextareaNativeEmits extends FieldCommonEmits {
  (e: 'linechange', event: any): void
}

export interface InputBaseEmits extends InputNativeEmits {}

export interface TextareaBaseEmits extends TextareaNativeEmits {}
