import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export type PopoutBeforeClose = (
  type: 'close' | 'cancel' | 'confirm',
  loading: {
    readonly cancel: boolean
    readonly confirm: boolean
    readonly close: boolean
  },
) => any | Promise<any>

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
  beforeClose?: PopoutBeforeClose
  keepRender?: boolean
}

export const defaultPopoutProps = defaultConfig.popout

export interface PopoutSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  cancel?(props: Record<string, never>): any
  confirm?(props: Record<string, never>): any
  visible?(props: { whole: boolean; already: boolean }): any
  'title-prepend'?(props: Record<string, never>): any
}

export interface PopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}
