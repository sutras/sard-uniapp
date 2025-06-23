import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ReadMoreProps {
  rootStyle?: StyleValue
  rootClass?: string
  maxHeight?: number
  hideClose?: boolean
  openText?: string
  closeText?: string
  visible?: boolean
  keepLocation?: boolean
}

export const defaultReadMoreProps = defaultConfig.readMore

export interface ReadMoreSlots {
  default?(props: Record<string, never>): any
}

export interface ReadMoreEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}

export interface ReadMoreExpose {}
