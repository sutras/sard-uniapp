import { type PropType, type StyleValue } from 'vue'

export interface ToastProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'text' | 'loading' | 'success' | 'fail'
  title?: string
  visible?: boolean
  position?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  transparent?: boolean
  duration?: number
}

// const props = withDefaults(defineProps<ToastProps>(), {
//   type: 'text',
//   position: 'center',
//   overlay: false,
//   duration: 1500,
// })

export const toastProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<NonNullable<ToastProps['type']>>,
    default: 'text',
  },
  title: String,
  visible: Boolean,
  position: {
    type: String as PropType<NonNullable<ToastProps['position']>>,
    default: 'center',
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  transparent: Boolean,
  duration: {
    type: Number,
    default: 1500,
  },
}

export interface ToastEmits {
  (e: 'update:visible', event: any): void
}

export interface ToastExpose {
  reHideLater: () => void
  cancelHide: () => void
}
