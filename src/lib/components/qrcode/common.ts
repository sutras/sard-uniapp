import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export type QrcodeECL = 'L' | 'M' | 'Q' | 'H'

export interface QrcodeProps {
  rootStyle?: StyleValue
  rootClass?: string
  text?: string
  ecl?: QrcodeECL
  type?: 'canvas' | 'image'
  size?: string
  canvasSize?: number
  color?: string
  bgColor?: string
  quietZoneModules?: number
}

export const defaultQrcodeProps = defaultConfig.qrcode

export interface QrcodeSlots {
  default?(props: Record<string, never>): any
}
