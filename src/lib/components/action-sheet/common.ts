import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export type ActionSheetBeforeClose = ((
  type: 'close' | 'cancel',
  loading: {
    readonly cancel: boolean
    readonly select: boolean
    readonly close: boolean
  },
) => any | Promise<any>) &
  ((
    type: 'select',
    item: ActionSheetItem,
    index: number,
    loading: {
      readonly cancel: boolean
      readonly select: boolean
      readonly close: boolean
    },
  ) => any | Promise<any>)

export interface ActionSheetProps {
  rootStyle?: StyleValue
  rootClass?: string
  description?: string
  itemList?: ActionSheetItem[]
  cancel?: string
  showCancel?: boolean
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: ActionSheetBeforeClose
  duration?: number
}

export const defaultActionSheetProps = defaultConfig.actionSheet

export interface ActionSheetEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'select', item: ActionSheetItem, index: number): void
}

export interface ActionSheetItem {
  name?: string
  description?: string
  color?: string
  loading?: boolean
  disabled?: boolean
}
