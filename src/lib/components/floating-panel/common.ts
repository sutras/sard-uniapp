import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface FloatingPanelProps {
  rootStyle?: StyleValue
  rootClass?: string
  height?: number
  anchors?: number[]
  duration?: number
  contentDraggable?: boolean
  safeAreaInsetBottom?: boolean
}

export const defaultFloatingPanelProps = defaultConfig.floatingPanel

export interface FloatingPanelSlots {
  default?(props: Record<string, never>): any
}

export interface FloatingPanelEmits {
  (e: 'update:height', value: number): void
  (e: 'height-change', value: number): void
}

export interface FloatingPanelExpose {}
