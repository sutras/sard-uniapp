import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SignatureProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'png' | 'jpg'
  color?: string
  lineWidth?: number
  background?: string
  fullScreen?: boolean
  duration?: number
  visible?: boolean
  cancelText?: string
  clearText?: string
  submitText?: string
  customNavbar?: boolean
}

export const defaultSignatureProps = defaultConfig.signature

export interface SignatureSlots {
  default?(props: Record<string, never>): any
}

export interface SignatureEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', dataURL: string): void
  (e: 'clear'): void
  (e: 'cancel'): void
}

export interface SignatureExpose {
  resize: () => void
  clear: () => void
  submit: () => void
}
