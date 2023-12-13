import { type PropType, type StyleValue } from 'vue'

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
    default: 0,
  },
  itemList: Array as PropType<StepsProps['itemList']>,
  center: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String as PropType<StepsProps['direction']>,
    default: 'horizontal',
  },
  status: String as PropType<StepsProps['status']>,
  iconFamily: String,
  iconSize: String,
  finishIcon: {
    type: String,
    default: 'check-circle-fill',
  },
  processIcon: {
    type: String,
    default: 'circle',
  },
  waitIcon: {
    type: String,
    default: 'circle',
  },
  errorIcon: {
    type: String,
    default: 'x-circle',
  },
}
