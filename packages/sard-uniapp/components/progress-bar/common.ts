import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface ProgressBarProps {
  rootStyle?: StyleValue
  rootClass?: string
  percent?: number
  inside?: boolean
  color?: string
  trackColor?: string
  thickness?: string
  showText?: boolean
  striped?: boolean
  animated?: boolean
  status?: 'success' | 'warning' | 'error'
}

export const defaultProgressBarProps = (): DefaultProps<ProgressBarProps> => ({
  percent: 0,
  showText: true,
  ...defaultConfig.progressBar,
})

export interface ProgressBarSlots {
  default?(props: Record<string, never>): any
}
