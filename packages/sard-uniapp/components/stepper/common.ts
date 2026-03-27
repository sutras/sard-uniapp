import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface StepperProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: number | string | null
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

export const defaultStepperProps = (): DefaultProps<StepperProps> => ({
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  inputType: 'number',
  press: true,
  pressTime: 350,
  interval: 150,
  validateEvent: true,
  size: 'medium',
  ...defaultConfig.stepper,
})

export interface StepperEmits {
  (e: 'update:model-value', value: number | string | undefined): void
  (e: 'change', value: number | string | undefined): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
}
