import { type PropType, type StyleValue } from 'vue'
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
    default: defaultConfig.shareSheet.overlayClosable,
  },
  beforeClose: Function as PropType<ShareSheetProps['beforeClose']>,
  duration: {
    type: Number,
    default: defaultConfig.shareSheet.duration,
  },
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
