import { defaultConfig } from '../config'
import {
  type SlideVerifySlots,
  type SlideVerifyProps,
  type SlideVerifyExpose,
  type SlideVerifyEmits,
} from '../slide-verify/common'

export interface RotateVerifyProps extends SlideVerifyProps {
  src?: string
}

export const defaultRotateVerifyProps = {
  ...defaultConfig.slideVerify,
}

export interface RotateVerifySlots extends SlideVerifySlots {}

export interface RotateVerifyEmits extends SlideVerifyEmits {}

export interface RotateVerifyExpose extends SlideVerifyExpose {}
