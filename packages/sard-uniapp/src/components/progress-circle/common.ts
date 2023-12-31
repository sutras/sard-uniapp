import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ProgressCircleProps {
  rootStyle?: StyleValue
  rootClass?: string
  percent?: number
  color?: string
  trackColor?: string
  thickness?: number
  size?: string
  status?: 'success' | 'warning' | 'error'
}

// const props = withDefaults(defineProps<ProgressCircleProps>(), {
//   percent: 0,
//   thickness: 4,
// })

export const progressCircleProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  percent: {
    type: Number,
    default: defaultConfig.progressCircle.percent,
  },
  color: String,
  trackColor: String,
  thickness: {
    type: Number,
    default: defaultConfig.progressCircle.thickness,
  },
  size: String,
  status: String as PropType<ProgressCircleProps['status']>,
}

export interface ProgressCircleSlots {
  default(props: Record<string, never>): any
}
