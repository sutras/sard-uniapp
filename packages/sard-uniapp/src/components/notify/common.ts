import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface NotifyProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'primary' | 'success' | 'warning' | 'error'
  message?: string
  color?: string
  background?: string
  visible?: boolean
  position?: 'top' | 'bottom'
  timeout?: number
  duration?: number
}

export const notifyProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<NotifyProps['type']>,
    default: defaultConfig.notify.type,
  },
  message: String,
  color: String,
  background: String,
  visible: Boolean,
  position: {
    type: String as PropType<NonNullable<NotifyProps['position']>>,
    default: defaultConfig.notify.position,
  },
  timeout: {
    type: Number,
    default: defaultConfig.notify.timeout,
  },
  duration: {
    type: Number,
    default: defaultConfig.notify.duration,
  },
}

// const props = withDefaults(defineProps<NotifyProps>(), {
//   type: 'primary',
//   timeout: 3000,
//   position: 'top',
// })

export interface NotifyEmits {
  (e: 'click', event: any): void
  (e: 'update:visible', event: any): void
}

export interface NotifyExpose {
  reHideLater: () => void
  cancelHide: () => void
}
