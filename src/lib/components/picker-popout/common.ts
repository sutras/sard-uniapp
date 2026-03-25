import {
  defaultPickerProps,
  type PickerSlots,
  type PickerProps,
} from '../picker/common'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'

export interface PickerPopoutProps extends FormPopoutProps, PickerProps {}

export const defaultPickerPopoutProps =
  (): DefaultProps<PickerPopoutProps> => ({
    ...defaultPickerProps(),
    validateEvent: true,
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
