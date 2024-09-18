import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface QrcodeProps {
  rootStyle?: StyleValue
  rootClass?: string
  text?: string
  ecl?: 'L' | 'M' | 'Q' | 'H'
  type?: 'canvas' | 'image'
  size?: string
  canvasSize?: number
  color?: string
  bgColor?: string
  quietZoneModules?: number
}

export const defaultQrcodeProps = defaultConfig.qrcode
