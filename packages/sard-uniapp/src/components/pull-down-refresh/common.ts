import { type PropType, type StyleValue } from 'vue'

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
}

// const props = withDefaults(defineProps<PullDownRefreshProps>(), {
//   threshold: 50,
//   headerHeight: 50,
//   loading: false,
//   transitionDuration: 300,
//   doneDuration: 0,
// })

export const pullDownRefreshProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  threshold: {
    type: Number,
    default: 50,
  },
  headerHeight: {
    type: Number,
    default: 50,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  transitionDuration: {
    type: Number,
    default: 300,
  },
  doneDuration: {
    type: Number,
    default: 0,
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
