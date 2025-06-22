import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ScrollListProps {
  rootStyle?: StyleValue
  rootClass?: string
  scrollbarBg?: string
  scrollbarWidth?: number
  thumbBg?: string
  thumbWidth?: number
  mode?: 'stubborn' | 'traditional'
  upperThreshold?: number
  lowerThreshold?: number
}

export const defaultScrollListProps = defaultConfig.scrollList

export interface ScrollListSlots {
  default?(props: Record<string, never>): any
}

export interface ScrollListEmits {
  (e: 'scroll', event: any): void
  (e: 'scrolltoupper', event: any): void
  (e: 'scrolltolower', event: any): void
}

export interface ScrollListExpose {
  update: () => Promise<void>
}
