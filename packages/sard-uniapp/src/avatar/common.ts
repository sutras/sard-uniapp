import { type PropType, type StyleValue } from 'vue'

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

export const avatarProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  shape: {
    type: String as PropType<AvatarProps['shape']>,
    default: 'circle',
  },
  size: String,
  iconSize: String,
  background: String,
  color: String,
  src: String,
}

export interface AvatarSlots {
  default(props: Record<string, never>): any
  extra(props: Record<string, never>): any
}
