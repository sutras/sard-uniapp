import { type PropType, type StyleValue } from 'vue'

export interface NoticeBarProps {
  rootStyle?: StyleValue
  rootClass?: string
  color?: string
  background?: string
  hideLeftIcon?: boolean
  delay?: number
  speed?: number
  scrollable?: 'auto' | 'never' | 'always'
  wrap?: boolean
  closable?: boolean
  linkable?: boolean
  visible?: boolean
  vertical?: boolean
}

// const props = withDefaults(defineProps<NoticeBarProps>(), {
//   visible: true,
//   delay: 1000,
//   speed: 50,
//   scrollable: 'auto',
// })

export const noticeBarProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  color: String,
  background: String,
  hideLeftIcon: Boolean,
  delay: {
    type: Number,
    default: 1000,
  },
  speed: {
    type: Number,
    default: 50,
  },
  scrollable: {
    type: String,
    default: 'auto',
  },
  wrap: Boolean,
  closable: Boolean,
  linkable: Boolean,
  visible: {
    type: Boolean,
    default: true,
  },
  vertical: Boolean,
}

export interface NoticeBarSlots {
  default(props: Record<string, never>): any
  'left-icon'(props: Record<string, never>): any
  'right-icon'(props: Record<string, never>): any
}

export interface NoticeBarEmits {
  (e: 'click', event: any): void
  (e: 'close'): void
}
