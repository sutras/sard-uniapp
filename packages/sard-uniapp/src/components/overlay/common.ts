import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface OverlayProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  zIndex?: number
  duration?: number
  background?: string
  transparent?: boolean
}

export const overlayPropsDefaults = defaultConfig.overlay

export interface OverlaySlots {
  default?(props: Record<string, never>): any
}

export interface OverlayEmits {
  (e: 'click', event: any): void
}
