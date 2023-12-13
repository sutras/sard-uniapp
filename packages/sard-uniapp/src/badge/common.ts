import { type PropType, type StyleValue } from 'vue'

export interface BadgeProps {
  rootStyle?: StyleValue
  rootClass?: string
  value?: number | string
  max?: number
  showZero?: boolean
  color?: string
  textColor?: string
  dot?: boolean
  fixed?: boolean
}

export const badgeProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  value: {
    type: [Number, String],
    dfault: 0,
  },
  max: {
    type: Number,
    default: 99,
  },
  showZero: Boolean,
  color: String,
  textColor: String,
  dot: Boolean,
  fixed: Boolean,
}

export interface BadgeSlots {
  default(props: Record<string, never>): any
  value(props: Record<string, never>): any
}
