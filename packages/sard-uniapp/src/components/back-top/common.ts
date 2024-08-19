import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface BackTopProps {
  rootStyle?: StyleValue
  rootClass?: string
  scrollTop?: number
  visibleHeight?: number
  right?: string
  bottom?: string
}

export const backTopPropsDefaults = {
  ...defaultConfig.backTop,
  scrollTop: 0,
}

export interface BackTopSlots {
  default?(props: Record<string, never>): any
}

export interface BackTopEmits {
  (e: 'click', event: any): void
}
