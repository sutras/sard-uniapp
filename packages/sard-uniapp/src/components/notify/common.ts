import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface NotifyProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'primary' | 'success' | 'warning' | 'error'
  message?: string
  color?: string
  background?: string
  visible?: boolean
  position?: 'top' | 'bottom'
  timeout?: number
  duration?: number
}

export const notifyPropsDefaults = defaultConfig.notify

export interface NotifyEmits {
  (e: 'click', event: any): void
  (e: 'update:visible', event: any): void
}

export interface NotifyExpose {
  reHideLater: () => void
  cancelHide: () => void
}
