import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface EmptyProps {
  rootStyle?: StyleValue
  rootClass?: string
  description?: string
  icon?: string
  iconFamily?: string
  iconSize?: string
  size?: 'small' | 'medium'
}

export const defaultEmptyProps = (): DefaultProps<EmptyProps> => ({
  icon: 'empty',
  ...defaultConfig.empty,
})

export interface EmptySlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
}
