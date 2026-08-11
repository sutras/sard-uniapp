import { shallowRef, type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import {
  InputNativeEmits,
  InputNativeProps,
  TextareaNativeEmits,
  TextareaNativeProps,
} from '../input-base/common'

export interface InputProps
  extends Omit<InputNativeProps, 'type'>,
    TextareaNativeProps {
  // input
  type?: InputNativeProps['type'] | 'password' | 'textarea'

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
  inputMinHeight?: boolean

  size?: 'mini' | 'small' | 'medium' | 'large'

  internalPrepend?: number
}

export const defaultInputProps = (): DefaultProps<InputProps> => ({
  enableNative: false,
  controlled: true,
  maxlength: 140,
  adjustPosition: true,
  ignoreCompositionEvent: true,
  showConfirmBar: true,
  disableDefaultPadding: true,
  modelValue: '',
  validateEvent: true,
  cursorSpacing: 30,
  cursor: -1,
  selectionStart: -1,
  selectionEnd: -1,
  inputmode: 'text',
  ...defaultConfig.input,
})

export interface InputSlots {
  prepend?(props: Record<string, never>): any
  append?(props: Record<string, never>): any
  addon?(props: Record<string, never>): any
}

export interface InputEmits extends InputNativeEmits, TextareaNativeEmits {
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
  (e: 'click', event: any): void
}

export const lastFocusInput = shallowRef<string>('')
