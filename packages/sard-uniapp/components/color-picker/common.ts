import { type StyleValue } from 'vue'

import { type DefaultProps, defaultConfig } from '../config'
import { type ColorFormat, defaultColorPickerPresets } from '../../utils/color'

export interface ColorPickerProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: string
  showAlpha?: boolean
  format?: ColorFormat
  showFormat?: boolean
  presets?: string[]
  showPresets?: boolean
  disabled?: boolean
  readonly?: boolean
  validateEvent?: boolean
}

export const defaultColorPickerProps = (): DefaultProps<ColorPickerProps> => ({
  showAlpha: false,
  format: 'rgb',
  showFormat: false,
  presets: () => defaultColorPickerPresets.slice(),
  showPresets: false,
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
