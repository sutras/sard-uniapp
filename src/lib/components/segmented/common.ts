import { type StyleValue } from 'vue'

import { defaultConfig } from '../config'

export type SegmentedOption =
  | {
      [key: PropertyKey]: any
    }
  | string
  | number
  | boolean

export interface SegmentedOptionKeys {
  label?: string
  value?: string
  disabled?: string
}

export const defaultOptionKeys = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
}

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
  optionKeys?: SegmentedOptionKeys
  validateEvent?: boolean
}

export const defaultSegmentedProps = defaultConfig.segmented

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
  value: any
  toggle: (value: any) => void
}

export const segmentedContextSymbol = Symbol('segmented-context')
