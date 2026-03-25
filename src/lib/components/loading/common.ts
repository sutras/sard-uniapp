import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface LoadingProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'clock' | 'circular'
  color?: string
  size?: string
  text?: string
  textColor?: string
  textSize?: string
  vertical?: boolean
  animated?: boolean
  progress?: number
}

export const defaultLoadingProps = (): DefaultProps<LoadingProps> => ({
  type: 'circular',
  ...defaultConfig.loading,
  animated: true,
  progress: 1,
})

export interface LoadingSlots {
  default?(props: Record<string, never>): any
  circular?(props: Record<string, never>): any
}
