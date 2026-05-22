import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { ShareSheetItemProps } from '../share-sheet-item'

export interface ShareSheetProps {
  rootStyle?: StyleValue
  rootClass?: string
  itemList?: ShareSheetItemProps[] | ShareSheetItemProps[][]
  title?: string
  description?: string
  cancel?: string
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: (type: 'close' | 'cancel' | 'select') => boolean | Promise<any>
  duration?: number
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

export type {
  ShareSheetItemProps,
  ShareSheetItemEmits,
  ShareSheetItemSlots,
} from '../share-sheet-item/common'
