import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface AvatarProps {
  rootStyle?: StyleValue
  rootClass?: string
  shape?: 'circle' | 'square'
  size?: string
  iconSize?: string
  background?: string
  color?: string
  src?: string
  index?: number
}

export const defaultAvatarProps = (): DefaultProps<AvatarProps> => ({
  shape: 'circle',
  ...defaultConfig.avatar,
})

export interface AvatarSlots {
  default?(props: Record<string, never>): any
  extra?(props: Record<string, never>): any
}

export interface AvatarEmits {
  (e: 'click', event: any): void
}
