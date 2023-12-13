import { type PropType, type StyleValue } from 'vue'

export interface EmptyProps {
  rootStyle?: StyleValue
  rootClass?: string
  description?: string
  icon?: string
  iconFamily?: string
  iconSize?: string
}

export const emptyProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  description: String,
  icon: {
    type: String,
    default: 'empty',
  },
  iconFamily: String,
  iconSize: String,
}

export interface EmptySlots {
  default(props: Record<string, never>): any
  icon(props: Record<string, never>): any
  description(props: Record<string, never>): any
}
