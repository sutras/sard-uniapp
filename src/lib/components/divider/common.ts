import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface DividerProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'solid' | 'dashed' | 'dotted'
  hairline?: boolean
  position?: 'left' | 'right' | 'center'
  vertical?: boolean
}

export const defaultDividerProps = defaultConfig.divider

export interface DividerSlots {
  default?(props: Record<string, never>): any
}

export interface DividerEmits {
  (e: 'click', event: any): void
}

export interface DividerExpose {}
