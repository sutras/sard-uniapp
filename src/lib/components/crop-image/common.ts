import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

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
  id?: string
  beforeCrop?: (width: number, height: number) => number
}

export const defaultCropImageProps = defaultConfig.cropImage

export interface CropImageSlots {
  default?(props: Record<string, never>): any
}

export interface CropImageEmits {
  (e: 'update:visible', visible: boolean): void
}

export interface CropImageExpose {}
