import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface LoadingProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'clock' | 'circular'
  color?: string
  size?: string
  text?: string
  textColor?: string
  textSize?: string
  vertical?: boolean
  animated?: boolean
  progress?: number
}

// const props = withDefaults(defineProps<LoadingProps>(), {
//   type: 'circular',
//   animated: true,
//   progress: 1,
// })

export const loadingProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<LoadingProps['type']>,
    default: defaultConfig.loading.type,
  },
  color: String,
  size: String,
  text: String,
  textColor: String,
  textSize: String,
  vertical: Boolean,
  animated: {
    type: Boolean,
    default: true,
  },
  progress: {
    type: Number,
    default: 1,
  },
}

export interface LoadingSlots {
  default(props: Record<string, never>): any
  circular(props: Record<string, never>): any
}
