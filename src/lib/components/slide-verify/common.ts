import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SlideVerifyResult {
  targetPos: number
  actualPos: number
  startTime: number
  endTime: number
  trajectory: [x: number, y: number, t: number][]
}

export interface SlideVerifyProps {
  rootStyle?: StyleValue
  rootClass?: string
  targetPos?: number
  text?: string
  successText?: string
  errorText?: string
  disabled?: boolean
  resetWhenError?: boolean
  showTarget?: boolean
  verify?: (result: SlideVerifyResult) => Promise<boolean> | boolean
}

export const defaultSlideVerifyProps = defaultConfig.slideVerify

export interface SlideVerifySlots {
  default?(props: Record<string, never>): any
  'text-before'?(props: Record<string, never>): any
  'text-after'?(props: Record<string, never>): any
}

export interface SlideVerifyEmits {}

export interface SlideVerifyExpose {
  reset: () => void
}
