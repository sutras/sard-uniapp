import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

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
    | 'neutral'
  size?: 'mini' | 'small' | 'medium' | 'large'
  round?: boolean
  disabled?: boolean
  loading?: boolean
  loadingType?: 'clock' | 'circular'
  color?: string
  background?: string
}

export const defaultButtonProps = defaultConfig.button

export interface ButtonSlots {
  default?(props: Record<string, never>): any
}

export interface ButtonEmits {
  (e: 'click', event: any): void
}
