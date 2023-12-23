import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

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
    default: defaultConfig.badge.value,
  },
  max: {
    type: Number,
    default: defaultConfig.badge.max,
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
