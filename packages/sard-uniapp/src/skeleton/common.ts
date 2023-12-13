import { type PropType, type StyleValue } from 'vue'

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

// const props = withDefaults(defineProps<SkeletonProps>(), {
//   rows: 3,
//   loading: true,
// })

export const SkeletonProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  rows: Number,
  title: Boolean,
  avatar: Boolean,
  avatarSize: String,
  avatarRound: Boolean,
  round: Boolean,
  loading: Boolean,
  animated: Boolean,
}

export interface SkeletonSlots {
  default(props: Record<string, never>): any
}

export interface SkeletonBlockProps {
  rootStyle?: StyleValue
  rootClass?: string
  animated?: boolean
  round?: boolean
  width?: string
  height?: string
}

export const skeletonBlockProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  animated: Boolean,
  round: Boolean,
  width: String,
  height: String,
}

export interface SkeletonAvatarProps extends SkeletonBlockProps {
  size?: string
}

export const SkeletonAvatarProps = {
  ...skeletonBlockProps,
  size: String,
}

export interface SkeletonParagraphProps extends SkeletonBlockProps {
  rows?: number
}

export const skeletonParagraphProps = {
  ...skeletonBlockProps,
  rows: Number,
}

export interface SkeletonTitleProps extends SkeletonBlockProps {}

export const skeletonTitleProps = skeletonBlockProps
