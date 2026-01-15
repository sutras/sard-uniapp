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

export interface SlideVerifySlots {}

export interface SlideVerifyEmits {
  (e: 'start', event: any): void
  (e: 'move', event: any): void
  (e: 'end', event: any): void
  (e: 'change', percent: number): void
}

export interface SlideVerifyExpose {
  reset: () => void
}
