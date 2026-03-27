import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

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

export const defaultBadgeProps = (): DefaultProps<BadgeProps> => ({
  value: 0,
  max: 99,
  ...defaultConfig.badge,
})

export interface BadgeSlots {
  default?(props: Record<string, never>): any
  value?(props: Record<string, never>): any
}
