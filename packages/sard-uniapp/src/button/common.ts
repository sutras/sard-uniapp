import { type PropType, type StyleValue } from 'vue'

export interface ButtonProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'default' | 'pale' | 'mild' | 'outline' | 'text' | 'pale-text'
  theme?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'body'
  size?: 'mini' | 'small' | 'medium' | 'large'
  round?: boolean
  disabled?: boolean
  loading?: boolean
  loadingType?: 'clock' | 'circular'
  color?: string
  background?: string
}

export const buttonProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: 'default',
  },
  theme: {
    type: String as PropType<ButtonProps['theme']>,
    default: 'primary',
  },
  size: {
    type: String as PropType<ButtonProps['size']>,
    default: 'medium',
  },
  round: Boolean,
  disabled: Boolean,
  loading: Boolean,
  loadingType: String as PropType<ButtonProps['loadingType']>,
  color: String,
  background: String,
}

export interface ButtonSlots {
  default(props: Record<string, never>): any
}

export interface ButtonEmits {
  (e: 'click', event: any): void
}
