import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export interface PopoutProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  duration?: number
  title?: string
  type?: 'compact' | 'loose'
  showCancel?: boolean
  cancelText?: string
  showConfirm?: boolean
  confirmText?: string
  confirmDisabled?: boolean
  showClose?: boolean
  showFooter?: boolean
  overlayClosable?: boolean
  beforeClose?: (
    type: 'close' | 'cancel' | 'confirm',
  ) => boolean | undefined | Promise<any>
  keepRender?: boolean
}

export const defaultPopoutProps = defaultConfig.popout

export interface PopoutSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  cancel?(props: Record<string, never>): any
  confirm?(props: Record<string, never>): any
  visible?(props: { whole: boolean; already: boolean }): any
}

export interface PopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}
