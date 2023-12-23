import { type PropType, type StyleValue } from 'vue'
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

export const actionSheetProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  description: String,
  itemList: Array as PropType<ActionSheetProps['itemList']>,
  cancel: String,
  visible: Boolean,
  overlayClosable: {
    type: Boolean,
    default: defaultConfig.actionSheet.overlayClosable,
  },
  beforeClose: Function as PropType<ActionSheetProps['beforeClose']>,
  duration: {
    type: Number,
    default: defaultConfig.shareSheet.duration,
  },
}

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
