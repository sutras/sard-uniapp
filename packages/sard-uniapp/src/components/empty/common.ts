import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface EmptyProps {
  rootStyle?: StyleValue
  rootClass?: string
  description?: string
  icon?: string
  iconFamily?: string
  iconSize?: string
}

export const emptyPropsDefaults = defaultConfig.empty

export interface EmptySlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
}
