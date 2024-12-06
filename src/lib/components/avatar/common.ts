import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface AvatarProps {
  rootStyle?: StyleValue
  rootClass?: string
  shape?: 'circle' | 'square'
  size?: string
  iconSize?: string
  background?: string
  color?: string
  src?: string
}

export const defaultAvatarProps = defaultConfig.avatar

export interface AvatarSlots {
  default?(props: Record<string, never>): any
  extra?(props: Record<string, never>): any
}
