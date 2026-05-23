import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type ActionSheetItemProps } from '../action-sheet-item'
import { type UseActionSheetReturn } from './context'

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
    item: ActionSheetItemProps,
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
  itemList?: ActionSheetItemProps[]
  cancel?: string
  showCancel?: boolean
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: ActionSheetBeforeClose
  duration?: number
  internalDefault?: number
  internalDescription?: number
  internalCancel?: number
  internalContext?: UseActionSheetReturn
}

export const defaultActionSheetProps = (): DefaultProps<ActionSheetProps> => ({
  overlayClosable: true,
  duration: 250,
  ...defaultConfig.actionSheet,
})

export interface ActionSheetEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'select', item: ActionSheetItemProps, index: number): void
}

export interface ActionSheetSlots {
  default?(props?: any): any
  description?(props?: any): any
  cancel?(props?: any): any
}

export type {
  ActionSheetItemProps,
  ActionSheetItemEmits,
  ActionSheetItemSlots,
} from '../action-sheet-item/common'
