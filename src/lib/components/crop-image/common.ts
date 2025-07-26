import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'

export interface CropImageProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  src?: string
  cropScale?: string
  type?: 'png' | 'jpg'
  quality?: number
  duration?: number
  success?: (filePath: string) => void
  fail?: (err: any) => void
  complete?: () => void
  cancel?: () => void
  id?: string
  beforeCrop?: (width: number, height: number) => number
  cancelText?: string
  confirmText?: string
}

export const defaultCropImageProps = defaultConfig.cropImage

export interface CropImageSlots {
  default?(props: Record<string, never>): any
}

export interface CropImageEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
}

export interface CropImageExpose {}
