import { type StyleValue } from 'vue'
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

export const defaultStepperProps = defaultConfig.stepper

export interface StepperEmits {
  (e: 'update:model-value', value: number | string | undefined): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
}
