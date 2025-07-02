import { type NodeRect } from '../../utils'
import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ResizeSensorProps {
  rootStyle?: StyleValue
  rootClass?: string
  initial?: boolean
  threshold?: number
}

export const defaultResizeSensorProps = defaultConfig.resizeSensor

export interface ResizeSensorSlots {
  default?(props: Record<string, never>): any
}

export interface ResizeSensorEmits {
  (e: 'resize', value: NodeRect): void
}

export interface ResizeSensorExpose {}
