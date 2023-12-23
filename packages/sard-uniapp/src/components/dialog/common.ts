import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface DialogProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  title?: string
  message?: string
  headed?: boolean
  buttonType?: 'round' | 'text'
  showCancel?: boolean
  cancelText?: string
  showConfirm?: boolean
  confirmText?: string
  overlayClosable?: boolean
  beforeClose?: (type: 'close' | 'cancel' | 'confirm') => any | Promise<any>
  duration?: number
}

// const props = withDefaults(defineProps<DialogProps>(), {
//   headed: true,
//   buttonType: 'round',
//   showCancel: true,
//   showConfirm: true,
//   overlayClosable: false,
// })

export const dialogProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  visible: Boolean,
  title: String,
  message: String,
  headed: {
    type: Boolean,
    default: defaultConfig.dialog.headed,
  },
  buttonType: {
    type: String as PropType<NonNullable<DialogProps['buttonType']>>,
    default: defaultConfig.dialog.buttonType,
  },
  showCancel: {
    type: Boolean,
    default: defaultConfig.dialog.showCancel,
  },
  cancelText: String,
  showConfirm: {
    type: Boolean,
    default: defaultConfig.dialog.showConfirm,
  },
  confirmText: String,
  overlayClosable: {
    type: Boolean,
    default: defaultConfig.dialog.overlayClosable,
  },
  beforeClose: Function as PropType<DialogProps['beforeClose']>,
  duration: {
    type: Number,
    default: defaultConfig.dialog.duration,
  },
}

export interface DialogSlots {
  default(props: Record<string, never>): any
}

export interface DialogEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}
