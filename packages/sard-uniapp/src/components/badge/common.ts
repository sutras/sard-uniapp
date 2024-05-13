import { type StyleValue } from 'vue'
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

export const badgePropsDefaults = defaultConfig.badge

export interface BadgeSlots {
  default?(props: Record<string, never>): any
  value?(props: Record<string, never>): any
}
