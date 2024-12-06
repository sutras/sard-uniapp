import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface FloatingBubbleProps {
  rootStyle?: StyleValue
  rootClass?: string
  axis?: 'x' | 'y' | 'both' | 'none'
  magnet?: 'x' | 'y'
  gapX?: number
  gapY?: number
  offset?: { x: number; y: number }
}

export const defaultFloatingBubbleProps = defaultConfig.floatingBubble

export interface FloatingBubbleSlots {
  default?(props: Record<string, never>): any
}

export interface FloatingBubbleEmits {
  (e: 'click', event: any): void
  (e: 'update:offset', offset: { x: number; y: number }): void
}
