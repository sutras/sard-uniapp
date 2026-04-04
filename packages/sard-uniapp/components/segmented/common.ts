import { type StyleValue } from 'vue'

import { type DefaultProps, defaultConfig } from '../config'
import { type OptionKeys } from '../../use'

export type SegmentedOption =
  | {
      [key: PropertyKey]: any
    }
  | string
  | number
  | boolean

export type SegmentedSize = 'small' | 'middle' | 'large'

export interface SegmentedProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  size?: SegmentedSize
  direction?: 'horizontal' | 'vertical'
  shape?: 'square' | 'round'
  options?: SegmentedOption[]
  optionKeys?: OptionKeys
  validateEvent?: boolean
  ellipsis?: boolean
}

export const defaultSegmentedProps = (): DefaultProps<SegmentedProps> => ({
  size: 'middle',
  shape: 'square',
  direction: 'horizontal',
  validateEvent: true,
  ellipsis: true,
  ...defaultConfig.segmented,
})

export interface SegmentedSlots {
  default?(props: Record<string, never>): any
}

export interface SegmentedEmits {
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}

export interface SegmentedExpose {}

export interface SegmentedContext {
  disabled: SegmentedProps['disabled']
  readonly: SegmentedProps['readonly']
  size: SegmentedProps['size']
  shape: SegmentedProps['shape']
  ellipsis: boolean
  value: any
  toggle: (value: any) => void
}

export const segmentedContextSymbol = Symbol('segmented-context')
