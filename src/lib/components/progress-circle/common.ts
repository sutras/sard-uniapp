import { type StyleValue } from 'vue'
import { defaultConfig, DefaultProps } from '../config'

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

export const defaultProgressCircle = (): DefaultProps<ProgressCircleProps> => ({
  percent: 0,
  thickness: 4,
  ...defaultConfig.progressCircle,
})

export interface ProgressCircleSlots {
  default?(props: Record<string, never>): any
}
