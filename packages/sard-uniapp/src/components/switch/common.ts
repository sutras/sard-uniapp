import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SwitchProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  size?: string
  checkedColor?: string
  uncheckedColor?: string
  checkedValue?: any
  uncheckedValue?: any
  beforeUpdate?: (value: any) => Promise<any>
  validateEvent?: boolean
}

export const switchPropsDefaults = defaultConfig.switch

export interface SwitchEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: any): void
  (e: 'update:loading', loading: boolean): void
}
