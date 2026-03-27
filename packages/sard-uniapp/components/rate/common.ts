import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

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

export const defaultRateProps = (): DefaultProps<RateProps> => ({
  count: 5,
  icon: 'star-fill',
  voidIcon: 'star',
  validateEvent: true,
  ...defaultConfig.rate,
})

export interface RateEmits {
  (e: 'update:model-value', value: number): void
  (e: 'change', value: number): void
}
