import { type Size } from '../../utils'
import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface ResizeSensorProps {
  rootStyle?: StyleValue
  rootClass?: string
  initial?: boolean
  threshold?: number
}

export const defaultResizeSensorProps =
  (): DefaultProps<ResizeSensorProps> => ({
    threshold: 150,
    ...defaultConfig.resizeSensor,
  })

export interface ResizeSensorSlots {
  default?(props: Record<string, never>): any
}

export interface ResizeSensorEmits {
  (e: 'resize', value: Size): void
}

export interface ResizeSensorExpose {}
