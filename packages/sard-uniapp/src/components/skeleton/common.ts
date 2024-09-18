import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SkeletonProps {
  rootStyle?: StyleValue
  rootClass?: string

  rows?: number
  title?: boolean
  avatar?: boolean
  avatarSize?: string
  avatarRound?: boolean
  round?: boolean
  loading?: boolean
  animated?: boolean
}

export const defaultSkeletonProps = defaultConfig.skeleton

export interface SkeletonSlots {
  default?(props: Record<string, never>): any
}

export interface SkeletonBlockProps {
  rootStyle?: StyleValue
  rootClass?: string
  animated?: boolean
  round?: boolean
  width?: string
  height?: string
}

export interface SkeletonAvatarProps extends SkeletonBlockProps {
  size?: string
}

export interface SkeletonParagraphProps extends SkeletonBlockProps {
  rows?: number
}

export interface SkeletonTitleProps extends SkeletonBlockProps {}
