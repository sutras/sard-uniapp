import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export type PullDownRefreshStatus =
  | 'initial'
  | 'unready'
  | 'ready'
  | 'loading'
  | 'done'
  | 'recovering'

export interface PullDownRefreshProps {
  rootStyle?: StyleValue
  rootClass?: string
  threshold?: number
  headerHeight?: number
  loading?: boolean
  transitionDuration?: number
  doneDuration?: number
  disabled?: number
}

// const props = withDefaults(defineProps<PullDownRefreshProps>(), {
//   threshold: 50,
//   headerHeight: 50,
//   loading: false,
//   transitionDuration: 300,
//   doneDuration: 0,
//   disabled: false,
// })

export const pullDownRefreshProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  threshold: {
    type: Number,
    default: defaultConfig.pullDownRefresh.threshold,
  },
  headerHeight: {
    type: Number,
    default: defaultConfig.pullDownRefresh.headerHeight,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  transitionDuration: {
    type: Number,
    default: defaultConfig.pullDownRefresh.transitionDuration,
  },
  doneDuration: {
    type: Number,
    default: defaultConfig.pullDownRefresh.doneDuration,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

export interface PullDownRefreshSlots {
  default(props: Record<string, never>): any
  unready(props: { progress: number }): any
  ready(props: Record<string, never>): any
  loading(props: Record<string, never>): any
  done(props: Record<string, never>): any
}

export interface PullDownRefreshEmits {
  (e: 'refresh'): void
}

export interface PullDownRefreshExpose {
  setScrollTop: (scrollTop: number) => void
}
