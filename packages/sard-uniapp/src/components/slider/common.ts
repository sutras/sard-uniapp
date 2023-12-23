import { type PropType, type StyleValue } from 'vue'
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

// const props = withDefaults(defineProps<SliderProps>(), {
//   min: 0,
//   max: 100,
//   step: 1,
//   validateEvent: true,
// })

export const sliderProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  range: Boolean,
  modelValue: [Number, Array] as PropType<SliderProps['modelValue']>,
  min: {
    type: Number,
    default: defaultConfig.slider.min,
  },
  max: {
    type: Number,
    default: defaultConfig.slider.max,
  },
  step: {
    type: Number,
    default: defaultConfig.slider.step,
  },
  vertical: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  pieceColor: String,
  trackColor: String,
  trackSize: String,
  thumbColor: String,
  thumbSize: String,
  showValue: Boolean,
  valuePosition: String as PropType<SliderProps['valuePosition']>,
  valueBackground: String,
  valueColor: String,
  showScale: Boolean,
  scalePosition: String as PropType<SliderProps['scalePosition']>,
  validateEvent: {
    type: Boolean,
    default: defaultConfig.slider.validateEvent,
  },
}

export interface SliderSlots {
  'start-thumb'(props: { value: number }): any
  'end-thumb'(props: { value: number }): any
}

export interface SliderEmits {
  (e: 'update:model-value', value: number | [number, number]): void
}
