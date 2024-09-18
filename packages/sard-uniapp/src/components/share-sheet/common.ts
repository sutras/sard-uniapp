import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ShareSheetProps {
  rootStyle?: StyleValue
  rootClass?: string
  itemList?: ShareSheetItem[] | ShareSheetItem[][]
  title?: string
  description?: string
  cancel?: string
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: (type: 'close' | 'cancel' | 'select') => boolean | Promise<any>
  duration?: number
}

export const defaultShareSheetProps = defaultConfig.shareSheet

export interface ShareSheetEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'select', item: ShareSheetItem): void
}

export interface ShareSheetItem {
  name?: string
  description?: string
  color?: string
  background?: string
  icon?: string
  iconFamily?: string
  disabled?: boolean
}
