import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface IconProps {
  rootStyle?: StyleValue
  rootClass?: string
  name?: string
  family?: string
  size?: string
  color?: string
}

// const props = withDefaults(defineProps<IconProps>(), {
//   family: 'sari',
//   name: '',
// })

export const iconProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  name: {
    type: String,
    default: defaultConfig.icon.name,
  },
  family: {
    type: String,
    default: defaultConfig.icon.family,
  },
  size: String,
  color: String,
}
