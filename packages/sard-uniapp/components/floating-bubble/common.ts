import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface FloatingBubbleProps {
  rootStyle?: StyleValue
  rootClass?: string
  draggable?: boolean
  axis?: 'x' | 'y' | 'both' | 'none'
  magnet?: 'x' | 'y'
  gapX?: number
  gapY?: number
  offset?: { x: number; y: number }
  navbarHeight?: number
  tabbarHeight?: number
}

export const defaultFloatingBubbleProps =
  (): DefaultProps<FloatingBubbleProps> => ({
    draggable: true,
    axis: 'y',
    gapX: 24,
    gapY: 24,
    ...defaultConfig.floatingBubble,
  })

export interface FloatingBubbleSlots {
  default?(props: Record<string, never>): any
}

export interface FloatingBubbleEmits {
  (e: 'click', event: any): void
  (e: 'update:offset', offset: { x: number; y: number }): void
}
