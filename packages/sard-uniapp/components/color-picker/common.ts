import { type StyleValue } from 'vue'

import { type DefaultProps, defaultConfig } from '../config'
import { type ColorFormat, defaultColorPickerPresets } from '../../utils/color'

export interface ColorPickerProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: string
  format?: ColorFormat
  showAlpha?: boolean
  presets?: string[]
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

export const defaultColorPickerProps = (): DefaultProps<ColorPickerProps> => ({
  format: 'hex',
  showAlpha: false,
  presets: () => defaultColorPickerPresets.slice(),
  validateEvent: true,
  ...defaultConfig.colorPicker,
})

export interface ColorPickerSlots {}

export interface ColorPickerEmits {
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'update:format', format: ColorFormat): void
  (e: 'format-change', format: ColorFormat): void
}

export interface ColorPickerExpose {}
