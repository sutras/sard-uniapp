import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type ShareSheetItemProps } from '../share-sheet-item'
import { type UseShareSheetReturn } from './context'

export interface ShareSheetProps {
  rootStyle?: StyleValue
  rootClass?: string
  itemList?: ShareSheetItemProps[] | ShareSheetItemProps[][]
  title?: string
  description?: string
  cancel?: string
  showCancel?: boolean
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: (type: 'close' | 'cancel' | 'select') => boolean | Promise<any>
  duration?: number
  internalDefault?: number
  internalTitle?: number
  internalDescription?: number
  internalCancel?: number
  internalContext?: UseShareSheetReturn
}

export const defaultShareSheetProps = (): DefaultProps<ShareSheetProps> => ({
  overlayClosable: true,
  duration: 250,
  ...defaultConfig.shareSheet,
})

export interface ShareSheetEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'select', item: ShareSheetItemProps): void
}

export interface ShareSheetSlots {
  default?(props?: any): any
  title?(props?: any): any
  description?(props?: any): any
  cancel?(props?: any): any
}
