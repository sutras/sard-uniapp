import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ProgressBarProps {
  rootStyle?: StyleValue
  rootClass?: string
  percent?: number
  inside?: boolean
  color?: string
  trackColor?: string
  thickness?: string
  showText?: boolean
  striped?: boolean
  animated?: boolean
  status?: 'success' | 'warning' | 'error'
}

// const props = withDefaults(defineProps<ProgressBarProps>(), {
//   percent: 0,
//   showText: true,
// })

export const progressBarProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  percent: {
    type: Number,
    default: defaultConfig.progressBar.percent,
  },
  inside: Boolean,
  color: String,
  trackColor: String,
  thickness: String,
  showText: {
    type: Boolean,
    default: defaultConfig.progressBar.showText,
  },
  striped: Boolean,
  animated: Boolean,
  status: String as PropType<ProgressBarProps['status']>,
}

export interface ProgressBarSlots {
  default(props: Record<string, never>): any
}
