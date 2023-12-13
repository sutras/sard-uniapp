import { type PropType, type StyleValue } from 'vue'

export interface StepperProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: number | string
  min?: number
  max?: number
  valueOnClear?: number | 'min' | 'max'
  step?: number
  precision?: number
  inputStyle?: string
  inputType?: 'number' | 'digit' | 'text'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  press?: boolean
  pressTime?: number
  interval?: number
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<StepperProps>(), {
//   min: Number.MIN_SAFE_INTEGER,
//   max: Number.MAX_SAFE_INTEGER,
//   step: 1,
//   inputType: 'number',
//   press: true,
//   pressTime: 350,
//   interval: 150,
//   validateEvent: true,
// })

export const stepperProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: [Number, String] as PropType<StepperProps['modelValue']>,
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
  },
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  valueOnClear: [Number, String] as PropType<StepperProps['valueOnClear']>,
  step: {
    type: Number,
    default: 1,
  },
  precision: Number,
  inputStyle: String,
  inputType: {
    type: String as PropType<StepperProps['inputType']>,
    default: 'number',
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  press: {
    type: Boolean,
    default: true,
  },
  pressTime: {
    type: Number,
    default: 350,
  },
  interval: {
    type: Number,
    default: 150,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export interface StepperEmits {
  (e: 'update:model-value', value: number | string | undefined): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
}
