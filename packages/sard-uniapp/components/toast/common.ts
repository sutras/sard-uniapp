import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export interface ToastProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'text' | 'loading' | 'success' | 'fail'
  title?: string | number
  icon?: string
  iconFamily?: string
  visible?: boolean
  position?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  transparent?: boolean
  timeout?: number
  duration?: number
  internalIcon?: number
  internalDefault?: number
}

export const defaultToastProps = (): DefaultProps<ToastProps> => ({
  type: 'text',
  position: 'center',
  overlay: false,
  transparent: false,
  timeout: 1500,
  duration: 200,
  ...defaultConfig.toast,
})

export interface ToastSlots {
  default?(props?: any): any
  icon?(props?: any): any
}

export interface ToastEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
}

export interface ToastExpose {
  reHideLater: () => void
  cancelHide: () => void
}
