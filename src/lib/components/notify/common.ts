import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

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
  statusBar?: boolean
}

export const defaultNotifyProps = defaultConfig.notify

export interface NotifySlots {
  default?(props: Record<string, never>): any
}

export interface NotifyEmits extends TransitionHookEmits {
  (e: 'click', event: any): void
  (e: 'update:visible', event: any): void
}

export interface NotifyExpose {
  reHideLater: () => void
  cancelHide: () => void
}
