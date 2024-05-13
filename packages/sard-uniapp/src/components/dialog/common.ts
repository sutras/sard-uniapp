import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface DialogProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  title?: string
  message?: string
  headed?: boolean
  buttonType?: 'round' | 'text'
  showCancel?: boolean
  cancelText?: string
  showConfirm?: boolean
  confirmText?: string
  overlayClosable?: boolean
  beforeClose?: (type: 'close' | 'cancel' | 'confirm') => any | Promise<any>
  duration?: number
}

export const dialogPropsDefaults = defaultConfig.dialog

export interface DialogSlots {
  default?(props: Record<string, never>): any
}

export interface DialogEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}
