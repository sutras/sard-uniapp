import { type PropType, type StyleValue } from 'vue'

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
    default: true,
  },
  buttonType: {
    type: String as PropType<NonNullable<DialogProps['buttonType']>>,
    default: 'round' as const,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  cancelText: String,
  showConfirm: {
    type: Boolean,
    default: true,
  },
  confirmText: String,
  overlayClosable: {
    type: Boolean,
    default: false,
  },
  beforeClose: Function as PropType<DialogProps['beforeClose']>,
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
