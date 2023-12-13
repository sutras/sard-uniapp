import { type PropType, type StyleValue } from 'vue'

export interface SwitchProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  size?: string
  checkedColor?: string
  uncheckedColor?: string
  checkedValue?: any
  uncheckedValue?: any
  beforeUpdate?: (value: any) => Promise<any>
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<SwitchProps>(), {
//   checkedValue: true,
//   uncheckedValue: false,
//   validateEvent: true,
// })

export const switchProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: null,
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  size: String,
  checkedColor: String,
  uncheckedColor: String,
  checkedValue: {
    type: null,
    default: true,
  },
  uncheckedValue: {
    type: null,
    default: false,
  },
  beforeUpdate: Function as PropType<SwitchProps['beforeUpdate']>,
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export interface SwitchEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: any): void
  (e: 'update:loading', loading: boolean): void
}
