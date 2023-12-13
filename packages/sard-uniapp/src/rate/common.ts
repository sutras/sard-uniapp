import { type PropType, type StyleValue } from 'vue'

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
    default: 5,
  },
  size: String,
  gap: String,
  iconFamily: String,
  icon: {
    type: String,
    default: 'star-fill',
  },
  voidIcon: {
    type: String,
    default: 'star',
  },
  text: String,
  voidText: String,
  color: String,
  voidColor: String,
  disabled: Boolean,
  readonly: Boolean,
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export interface RateEmits {
  (e: 'update:model-value', value: number): void
}
