import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface RateProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: number
  allowHalf?: boolean
  clearable?: boolean
  count?: number
  size?: string
  gap?: string
  iconFamily?: string
  icon?: string
  voidIcon?: string
  text?: string
  voidText?: string
  color?: string
  voidColor?: string
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<RateProps>(), {
//   count: 5,
//   icon: 'star-fill',
//   voidIcon: 'star',
//   validateEvent: true,
// })

export const rateProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: Number,
  allowHalf: Boolean,
  clearable: Boolean,
  count: {
    type: Number,
    default: defaultConfig.rate.count,
  },
  size: String,
  gap: String,
  iconFamily: String,
  icon: {
    type: String,
    default: defaultConfig.rate.icon,
  },
  voidIcon: {
    type: String,
    default: defaultConfig.rate.voidIcon,
  },
  text: String,
  voidText: String,
  color: String,
  voidColor: String,
  disabled: Boolean,
  readonly: Boolean,
  validateEvent: {
    type: Boolean,
    default: defaultConfig.rate.validateEvent,
  },
}

export interface RateEmits {
  (e: 'update:model-value', value: number): void
}
