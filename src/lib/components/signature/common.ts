import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface SignatureProps {
  rootStyle?: StyleValue
  rootClass?: string
  color?: string
  lineWidth?: number
  background?: string
  fullScreen?: boolean
  duration?: number
  visible?: boolean
  cancelText?: string
  clearText?: string
  confirmText?: string
  customNavbar?: boolean
  type?: 'png' | 'jpg'
  target?: 'dataURL' | 'filePath'
  quality?: number
}

export const defaultSignatureProps = (): DefaultProps<SignatureProps> => ({
  lineWidth: 3,
  fullScreen: false,
  color: '#000',
  duration: 150,
  type: 'png',
  target: 'dataURL',
  quality: 0.92,
  ...defaultConfig.signature,
})

export interface SignatureSlots {
  default?(props: Record<string, never>): any
}

export interface SignatureEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'confirm', dataURL: string): void
  (e: 'clear'): void
  (e: 'cancel'): void
}

export interface SignatureExpose {
  resize: () => void
  clear: () => void
  confirm: () => void
}
