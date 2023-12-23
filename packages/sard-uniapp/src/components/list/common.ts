import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ListProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string | number
  description?: string | number
  inlaid?: boolean
  card?: boolean
}

export const listProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  title: [String, Number],
  description: [String, Number],
  inlaid: Boolean,
  card: Boolean,
}

export interface ListSlots {
  default(props: Record<string, never>): any
  title(props: Record<string, never>): any
  description(props: Record<string, never>): any
}

export interface ListItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string | number
  description?: string | number
  value?: string | number
  hover?: boolean
  arrow?: boolean
  arrowDirection?: 'up' | 'right' | 'down'
  icon?: string
  iconSize?: string
  iconColor?: string
  iconFamily?: string
}

// const props = withDefaults(defineProps<ListItemProps>(), {
//   arrowDirection: 'right',
// })

export const listItemProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  title: [String, Number],
  description: [String, Number],
  value: [String, Number],
  hover: Boolean,
  arrow: Boolean,
  arrowDirection: {
    type: String as PropType<ListItemProps['arrowDirection']>,
    default: defaultConfig.listItem.arrowDirection,
  },
  icon: String,
  iconSize: String,
  iconColor: String,
  iconFamily: String,
}

export interface ListItemEmits {
  (e: 'click', event: any): void
}

export interface ListItemSlots {
  default(props: Record<string, never>): any
  title(props: Record<string, never>): any
  description(props: Record<string, never>): any
  value(props: Record<string, never>): any
  arrow(props: Record<string, never>): any
  icon(props: Record<string, never>): any
}
