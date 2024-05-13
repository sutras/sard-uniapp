import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface TagProps {
  rootStyle?: StyleValue
  rootClass?: string
  theme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
  plain?: boolean
  round?: boolean
  mark?: boolean
  size?: 'small' | 'medium' | 'large'
  color?: string
  textColor?: string
  closable?: boolean
}

export const tagPropsDefaults = defaultConfig.tag

export interface TagSlots {
  default?(props: Record<string, never>): any
}

export interface TagEmits {
  (e: 'click', event: any): void
  (e: 'close', event: any): void
}
