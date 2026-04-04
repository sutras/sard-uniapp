import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export type QrcodeECL = 'L' | 'M' | 'Q' | 'H'

export interface QrcodeProps {
  rootStyle?: StyleValue
  rootClass?: string
  text?: string
  ecl?: QrcodeECL
  type?: 'canvas' | 'image'
  size?: string
  /** @deprecated */
  canvasSize?: number
  color?: string
  bgColor?: string
  quietZoneModules?: number
  showMenuByLongpress?: boolean
  icon?: string
}

export const defaultQrcodeProps = (): DefaultProps<QrcodeProps> => ({
  ecl: 'M',
  size: '320rpx',
  type: 'canvas',
  text: '',
  color: '#000',
  bgColor: '#fff',
  quietZoneModules: 2,
  ...defaultConfig.qrcode,
})

export interface QrcodeSlots {
  default?(props: Record<string, never>): any
}

export interface QrcodeEmits {
  (e: 'success', tempFilePath: string): void
}
