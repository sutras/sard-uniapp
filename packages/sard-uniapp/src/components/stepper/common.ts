import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

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
  size?: 'small' | 'medium'
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
//   size: 'medium',
// })

export const stepperProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: [Number, String] as PropType<StepperProps['modelValue']>,
  min: {
    type: Number,
    default: defaultConfig.stepper.min,
  },
  max: {
    type: Number,
    default: defaultConfig.stepper.max,
  },
  valueOnClear: [Number, String] as PropType<StepperProps['valueOnClear']>,
  step: {
    type: Number,
    default: defaultConfig.stepper.step,
  },
  precision: Number,
  inputStyle: String,
  inputType: {
    type: String as PropType<StepperProps['inputType']>,
    default: defaultConfig.stepper.inputType,
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  press: {
    type: Boolean,
    default: defaultConfig.stepper.press,
  },
  pressTime: {
    type: Number,
    default: defaultConfig.stepper.pressTime,
  },
  interval: {
    type: Number,
    default: defaultConfig.stepper.interval,
  },
  validateEvent: {
    type: Boolean,
    default: defaultConfig.stepper.validateEvent,
  },
  size: {
    type: String,
    default: defaultConfig.stepper.size,
  },
}

export interface StepperEmits {
  (e: 'update:model-value', value: number | string | undefined): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
}
