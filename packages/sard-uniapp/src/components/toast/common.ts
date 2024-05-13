import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ToastProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'text' | 'loading' | 'success' | 'fail'
  title?: string | number
  visible?: boolean
  position?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  transparent?: boolean
  timeout?: number
  duration?: number
}

export const toastPropsDefaults = defaultConfig.toast

export interface ToastEmits {
  (e: 'update:visible', event: any): void
}

export interface ToastExpose {
  reHideLater: () => void
  cancelHide: () => void
}
