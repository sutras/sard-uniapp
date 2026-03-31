import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'
import {
  defaultColorPickerProps,
  type ColorPickerProps,
} from '../color-picker/common'

export interface ColorPickerPopoutProps
  extends FormPopoutProps,
    ColorPickerProps {}

export const defaultColorPickerPopoutProps =
  (): DefaultProps<ColorPickerPopoutProps> => ({
    ...defaultColorPickerProps(),
    showConfirm: true,
    validateEvent: true,
    ...defaultConfig.colorPickerPopout,
  })

export interface ColorPickerPopoutSlots {
  title?(props: Record<string, never>): any
  'title-prepend'?(props: Record<string, never>): any
}

export interface ColorPickerPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'confirm'): void
}

export interface ColorPickerPopoutExpose {}
