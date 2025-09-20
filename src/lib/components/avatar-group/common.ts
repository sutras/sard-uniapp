import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface AvatarGroupProps {
  rootStyle?: StyleValue
  rootClass?: string
  max: number
  total: number
  coverage?: number
  showRemain?: boolean
  remainText?: string | number
}

export const defaultAvatarGroupProps = defaultConfig.avatarGroup

export interface AvatarGroupSlots {
  default?(props: Record<string, never>): any
}

export interface AvatarGroupEmits {
  (e: 'remain-click', event: any): void
}

export interface AvatarGroupExpose {}

export interface AvatarGroupContext {
  total: number
  max: number
  showRemain: boolean
  remainText?: string | number
  coverage: number
  onRemainClick: (event: any) => void
}

export const avatarGroupContextSymbol = Symbol('avatar-group-context')
