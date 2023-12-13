import { type PropType, type StyleValue } from 'vue'

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
}

// const props = withDefaults(defineProps<ShareSheetProps>(), {
//   overlayClosable: true,
// })

export const shareSheetProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  itemList: Array as PropType<ShareSheetProps['itemList']>,
  title: String,
  description: String,
  cancel: String,
  visible: Boolean,
  overlayClosable: {
    type: Boolean,
    default: true,
  },
  beforeClose: Function as PropType<ShareSheetProps['beforeClose']>,
}

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
