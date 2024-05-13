import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SliderProps {
  rootStyle?: StyleValue
  rootClass?: string
  range?: boolean
  modelValue?: number | number[]
  min?: number
  max?: number
  step?: number
  vertical?: boolean
  disabled?: boolean
  readonly?: boolean
  pieceColor?: string
  trackColor?: string
  trackSize?: string
  thumbColor?: string
  thumbSize?: string
  showValue?: boolean
  valuePosition?: 'top' | 'right' | 'bottom' | 'left'
  valueBackground?: string
  valueColor?: string
  showScale?: boolean
  scalePosition?: 'top' | 'right' | 'bottom' | 'left'
  validateEvent?: boolean
}

export const sliderPropsDefaults = defaultConfig.slider

export interface SliderSlots {
  'start-thumb'?(props: { value: number }): any
  'end-thumb'?(props: { value: number }): any
}

export interface SliderEmits {
  (e: 'update:model-value', value: number | number[]): void
  (e: 'change', value: number | number[]): void
  (e: 'drag-start', event: TouchEvent): void
  (e: 'drag-end', event: TouchEvent): void
}
