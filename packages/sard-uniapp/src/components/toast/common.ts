import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ToastProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'text' | 'loading' | 'success' | 'fail'
  title?: string
  visible?: boolean
  position?: 'top' | 'center' | 'bottom'
  overlay?: boolean
  transparent?: boolean
  timeout?: number
  duration?: number
}

// const props = withDefaults(defineProps<ToastProps>(), {
//   type: 'text',
//   position: 'center',
//   overlay: false,
//   timeout: 1500,
// })

export const toastProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<NonNullable<ToastProps['type']>>,
    default: defaultConfig.toast.type,
  },
  title: String,
  visible: Boolean,
  position: {
    type: String as PropType<NonNullable<ToastProps['position']>>,
    default: defaultConfig.toast.position,
  },
  overlay: {
    type: Boolean,
    default: defaultConfig.toast.overlay,
  },
  transparent: Boolean,
  timeout: {
    type: Number,
    default: defaultConfig.toast.timeout,
  },
  duration: {
    type: Number,
    default: defaultConfig.toast.duration,
  },
}

export interface ToastEmits {
  (e: 'update:visible', event: any): void
}

export interface ToastExpose {
  reHideLater: () => void
  cancelHide: () => void
}
