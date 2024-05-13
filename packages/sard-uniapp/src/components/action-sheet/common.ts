import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ActionSheetProps {
  rootStyle?: StyleValue
  rootClass?: string
  description?: string
  itemList?: ActionSheetItem[]
  cancel?: string
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: (type: 'close' | 'cancel' | 'select') => boolean | Promise<any>
  duration?: number
}

export const actionSheetPropsDefaults = defaultConfig.actionSheet

export interface ActionSheetEmits {
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
