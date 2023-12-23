import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SwiperDotProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'dot' | 'dot-bar' | 'index' | 'title' | 'fraction'
  current?: number
  total?: number
  list?: any[]
  field?: string
}

// const props = withDefaults(defineProps<SwiperDotProps>(), {
//   type: 'dot',
//   current: 0,
//   total: 0,
//   field: 'title',
// })

export const swiperDotProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<SwiperDotProps['type']>,
    default: defaultConfig.swiperDot.type,
  },
  current: {
    type: Number,
    default: defaultConfig.swiperDot.current,
  },
  total: {
    type: Number,
    default: defaultConfig.swiperDot.total,
  },
  list: Array as PropType<SwiperDotProps['list']>,
  field: {
    type: String,
    default: defaultConfig.swiperDot.field,
  },
}
