import { type StyleValue } from 'vue'
import {
  defaultPickerProps,
  type PickerSlots,
  type PickerProps,
} from '../picker/common'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

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

export interface PickerPopoutSlots extends PickerSlots {}

export interface PickerPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
  (e: 'confirm'): void
}

export interface PickerPopoutExpose {}
