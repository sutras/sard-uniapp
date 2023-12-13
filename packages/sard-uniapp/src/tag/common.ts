import { type PropType, type StyleValue } from 'vue'

export interface TagProps {
  rootStyle?: StyleValue
  rootClass?: string
  theme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
  plain?: boolean
  round?: boolean
  mark?: boolean
  size?: 'small' | 'medium' | 'large'
  color?: string
  textColor?: string
  closable?: boolean
}

// const props = withDefaults(defineProps<TagProps>(), {
//   theme: 'default',
//   size: 'medium',
// })

export const tagProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  theme: {
    type: String as PropType<TagProps['theme']>,
    default: 'default',
  },
  plain: Boolean,
  round: Boolean,
  mark: Boolean,
  size: {
    type: String as PropType<TagProps['size']>,
    default: 'medium',
  },
  color: String,
  textColor: String,
  closable: Boolean,
}

export interface TagSlots {
  default(props: Record<string, never>): any
}

export interface TagEmits {
  (e: 'click', event: any): void
  (e: 'close', event: any): void
}
