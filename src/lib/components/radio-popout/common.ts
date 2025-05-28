import { type StyleValue } from 'vue'
import { type RadioGroupProps } from '../radio/common'
import { defaultConfig } from '../config'

export interface RadioPopoutProps extends RadioGroupProps {
  visible?: boolean
  title?: string
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultRadioPopoutProps = () => ({
  ...defaultConfig.radioPopout,
  options: () => [],
})

export interface RadioPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface RadioPopoutEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}

export interface RadioPopoutExpose {}
