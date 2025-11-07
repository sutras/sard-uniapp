import { type StyleValue } from 'vue'

import { defaultConfig } from '../config'

export type ImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export interface ImageProps {
  rootStyle?: StyleValue
  rootClass?: string
  src?: string
  mode?: ImageMode
  lazyLoad?: boolean
  webp?: boolean
  showMenuByLongpress?: boolean

  width?: string
  height?: string
  shape?: 'circle' | 'square'
  radius?: string
  loadingIcon?: string
  errorIcon?: string
  iconFamily?: string
  showLoading?: boolean
  showError?: boolean
  background?: string
  fade?: boolean
  customLoad?: (callback: (event: any) => void) => any
}

export const defaultImageProps = defaultConfig.image

export interface ImageSlots {
  loading?(props: Record<string, never>): any
  error?(props: Record<string, never>): any
}

export interface ImageEmits {
  (e: 'click', event: any): void
  (e: 'load', event: any): void
  (e: 'error', event: any): void
}

export interface ImageExpose {}

export const FIX_MODES = {
  widthFix: true,
  heightFix: true,
}

export const IMAGE_MODES = {
  aspectFit: ['center', 'contain'],
  aspectFill: ['center', 'cover'],
  scaleToFill: ['center', '100% 100%'],
  widthFix: [undefined, '100% 100%'],
  heightFix: [undefined, '100% 100%'],
  top: ['center top', 'auto'],
  bottom: ['center bottom', 'auto'],
  left: ['left center', 'auto'],
  right: ['right center', 'auto'],
  center: ['center', 'auto'],
  'top left': ['left top', 'auto'],
  'top right': ['right top', 'auto'],
  'bottom left': ['left bottom', 'auto'],
  'bottom right': ['right bottom', 'auto'],
}
