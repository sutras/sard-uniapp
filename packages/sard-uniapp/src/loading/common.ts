import { type PropType, type StyleValue } from 'vue'

export interface LoadingProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'clock' | 'circular'
  color?: string
  size?: string
  text?: string
  textColor?: string
  textSize?: string
  vertical?: boolean
}

// const props = withDefaults(defineProps<LoadingProps>(), {
//   type: 'circular',
// })

export const loadingProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  type: {
    type: String as PropType<LoadingProps['type']>,
    default: 'circular',
  },
  color: String,
  size: String,
  text: String,
  textColor: String,
  textSize: String,
  vertical: Boolean,
}

export interface LoadingSlots {
  default(props: Record<string, never>): any
}
