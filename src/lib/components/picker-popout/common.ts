import { type StyleValue } from 'vue'
import { defaultPickerProps, type PickerProps } from '../picker/common'
import { defaultConfig } from '../config'

export interface PickerPopoutProps extends PickerProps {
  visible?: boolean
  title?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultPickerPopoutProps = () => ({
  ...defaultPickerProps(),
  ...defaultConfig.pickerPopout,
})

export interface PickerPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface PickerPopoutEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}

export interface PickerPopoutExpose {}
