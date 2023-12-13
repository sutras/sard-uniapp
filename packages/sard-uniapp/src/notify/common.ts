import { type PropType, type StyleValue } from 'vue'

export interface NotifyProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'primary' | 'success' | 'warning' | 'error'
  message?: string
  color?: string
  background?: string
  visible?: boolean
  position?: 'top' | 'bottom'
  duration?: number
}

export const notifyProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<NotifyProps['type']>,
    default: 'primary',
  },
  message: String,
  color: String,
  background: String,
  visible: Boolean,
  position: {
    type: String as PropType<NonNullable<NotifyProps['position']>>,
    default: 'top',
  },
  duration: {
    type: Number as PropType<NonNullable<NotifyProps['duration']>>,
    default: 3000,
  },
}

// const props = withDefaults(defineProps<NotifyProps>(), {
//   type: 'primary',
//   duration: 3000,
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
