import { type StyleValue } from 'vue'
import { type RadioGroupProps } from '../radio/common'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export interface RadioPopoutProps extends RadioGroupProps {
  visible?: boolean
  title?: string
  popoutClass?: string
  popoutStyle?: StyleValue
  searchable?: boolean
  filterPlaceholder?: string
  resettable?: boolean
}

export const defaultRadioPopoutProps = () => ({
  ...defaultConfig.radioPopout,
  options: () => [],
})

export interface RadioPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface RadioPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
  (e: 'confirm'): void
}

export interface RadioPopoutExpose {}
