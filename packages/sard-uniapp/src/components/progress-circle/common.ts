import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ProgressCircleProps {
  rootStyle?: StyleValue
  rootClass?: string
  percent?: number
  color?: string
  trackColor?: string
  thickness?: number
  size?: string
  status?: 'success' | 'warning' | 'error'
}

export const progressCircleDefaults = defaultConfig.progressCircle

export interface ProgressCircleSlots {
  default?(props: Record<string, never>): any
}
