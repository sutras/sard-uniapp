import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface OverlayProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  zIndex?: number
  duration?: number
  background?: string
  transparent?: boolean
}

// const props = withDefaults(defineProps<OverlayProps>(), {
//   duration: 300,
// })

export const overlayProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  visible: Boolean,
  zIndex: Number,
  duration: {
    type: [Number, Array] as PropType<NonNullable<OverlayProps['duration']>>,
    default: defaultConfig.overlay.duration,
  },
  background: String,
  transparent: Boolean,
}

export interface OverlaySlots {
  default(props: Record<string, never>): any
}

export interface OverlayEmits {
  (e: 'click', event: any): void
}
