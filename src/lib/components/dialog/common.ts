import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type ButtonProps } from '../button'
import { type TransitionHookEmits } from '../popup/common'

export type DialogBeforeClose = (
  type: 'close' | 'cancel' | 'confirm',
  loading: {
    readonly cancel: boolean
    readonly confirm: boolean
    readonly close: boolean
  },
) => any | Promise<any>

export interface DialogProps {
  rootStyle?: StyleValue
  rootClass?: string
  popupStyle?: StyleValue
  popupClass?: string
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
  beforeClose?: DialogBeforeClose
  duration?: number
  cancelProps?: ButtonProps
  confirmProps?: ButtonProps
}

export const defaultDialogProps = defaultConfig.dialog

export interface DialogSlots {
  default?(props: Record<string, never>): any
}

export interface DialogEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}
