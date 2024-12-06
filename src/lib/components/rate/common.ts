import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface RateProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: number
  allowHalf?: boolean
  clearable?: boolean
  count?: number
  size?: string
  gap?: string
  iconFamily?: string
  icon?: string
  voidIcon?: string
  text?: string
  voidText?: string
  color?: string
  voidColor?: string
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

export const defaultRateProps = defaultConfig.rate

export interface RateEmits {
  (e: 'update:model-value', value: number): void
}
