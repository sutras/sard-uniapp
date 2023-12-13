import { type PropType, type StyleValue } from 'vue'

export interface ActionSheetProps {
  rootStyle?: StyleValue
  rootClass?: string
  description?: string
  itemList?: ActionSheetItem[]
  cancel?: string
  visible?: boolean
  overlayClosable?: boolean
  beforeClose?: (type: 'close' | 'cancel' | 'select') => boolean | Promise<any>
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
    default: true,
  },
  beforeClose: Function as PropType<ActionSheetProps['beforeClose']>,
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
