import { defaultConfig } from '../config'
import {
  type SlideVerifyEmits,
  type SlideVerifyExpose,
  type SlideVerifyProps,
  type SlideVerifySlots,
} from '../slide-verify/common'

export interface PuzzleVerifyProps extends SlideVerifyProps {
  src?: string
  aspectRatio?: number
}

export const defaultPuzzleVerifyProps = {
  ...defaultConfig.slideVerify,
  ...defaultConfig.puzzleVerify,
}

export interface PuzzleVerifySlots extends SlideVerifySlots {}

export interface PuzzleVerifyEmits extends SlideVerifyEmits {}

export interface PuzzleVerifyExpose extends SlideVerifyExpose {}
