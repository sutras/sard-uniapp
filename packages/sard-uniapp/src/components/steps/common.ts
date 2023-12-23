import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'

export interface StepsItem {
  status?: StepsStatus
  name?: string
  description?: string
}

export interface StepsProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: number
  itemList?: StepsItem[]
  center?: boolean
  direction?: 'vertical' | 'horizontal'
  status?: StepsStatus
  iconFamily?: string
  iconSize?: string
  finishIcon?: string
  processIcon?: string
  waitIcon?: string
  errorIcon?: string
}

// const props = withDefaults(defineProps<StepsProps>(), {
//   center: false,
//   direction: 'horizontal',
//   current: 0,
//   finishIcon: 'check-circle-fill',
//   processIcon: 'circle',
//   waitIcon: 'circle',
//   errorIcon: 'x-circle',
// })

export const stepsProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  current: {
    type: Number,
    default: defaultConfig.steps.current,
  },
  itemList: Array as PropType<StepsProps['itemList']>,
  center: {
    type: Boolean,
    default: defaultConfig.steps.center,
  },
  direction: {
    type: String as PropType<StepsProps['direction']>,
    default: defaultConfig.steps.direction,
  },
  status: String as PropType<StepsProps['status']>,
  iconFamily: String,
  iconSize: String,
  finishIcon: {
    type: String,
    default: defaultConfig.steps.finishIcon,
  },
  processIcon: {
    type: String,
    default: defaultConfig.steps.processIcon,
  },
  waitIcon: {
    type: String,
    default: defaultConfig.steps.waitIcon,
  },
  errorIcon: {
    type: String,
    default: defaultConfig.steps.errorIcon,
  },
}
