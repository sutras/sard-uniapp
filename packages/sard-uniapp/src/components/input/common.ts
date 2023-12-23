import { type PropType, type StyleValue } from 'vue'
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
  confirmHold?: number
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
}

export const inputProps = {
  placeholder: String,
  placeholderStyle: String,
  placeholderClass: String,
  disabled: Boolean,
  maxlength: {
    type: Number,
    default: defaultConfig.input.maxlength,
  },
  focus: Boolean,
  cursorSpacing: Number,
  cursor: Number,
  confirmType: String as PropType<InputProps['confirmType']>,
  confirmHold: Number,
  selectionStart: Number,
  selectionEnd: Number,
  adjustPosition: {
    type: Boolean,
    default: defaultConfig.input.adjustPosition,
  },
  holdKeyboard: Boolean,
  autoBlur: Boolean,
  ignoreCompositionEvent: {
    type: Boolean,
    default: defaultConfig.input.ignoreCompositionEvent,
  },
  inputmode: String as PropType<InputProps['inputmode']>,

  // textarea
  autoHeight: Boolean,
  fixed: Boolean,
  showConfirmBar: {
    type: Boolean,
    default: defaultConfig.input.showConfirmBar,
  },
  disableDefaultPadding: {
    type: Boolean,
    default: defaultConfig.input.disableDefaultPadding,
  },

  // input
  type: String as PropType<InputProps['type']>,
  alwaysEmbed: Boolean,
  safePasswordCertPath: String,
  safePasswordLength: String,
  safePasswordTimeStamp: String,
  safePasswordNonce: String,
  safePasswordSalt: String,
  safePasswordCustomHash: String,
  randomNumber: Boolean,
  controlled: Boolean,
  alwaysSystem: Boolean,

  // custom
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: {
    type: [String, Number] as PropType<InputProps['modelValue']>,
    default: defaultConfig.input.modelValue,
  },
  clearable: Boolean,
  showClearOnlyFocus: Boolean,
  showCount: Boolean,
  inlaid: Boolean,
  borderless: Boolean,
  readonly: Boolean,
  focused: Boolean,
  minHeight: String,
  validateEvent: {
    type: Boolean,
    default: defaultConfig.input.validateEvent,
  },
}

// const props = withDefaults(defineProps<InputProps>(), {
//   maxlength: 140,
//   showConfirmBar: true,
//   adjustPosition: true,
//   disableDefaultPadding: true,
//   ignoreCompositionEvent: true,
//   modelValue: '',
//   validateEvent: true,
// })

export interface InputSlots {
  prepend(props: Record<string, never>): any
  append(props: Record<string, never>): any
  addon(props: Record<string, never>): any
}

export interface InputEmits {
  (e: 'update:model-value', value: string): void
  (e: 'clear'): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
  (e: 'linechange', event: any): void
  (e: 'confirm', event: any): void
  (e: 'keyboardheightchange', event: any): void
}
