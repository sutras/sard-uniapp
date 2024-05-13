import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ResultProps {
  rootStyle?: StyleValue
  rootClass?: string
  status?: 'success' | 'info' | 'warning' | 'error' | 'question'
  icon?: string
  iconFamily?: string
  iconColor?: string
  title?: string
  description?: string
}

export const resultPropsDefaults = defaultConfig.result

export interface ResultSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
}

export const mapStatusIcon = {
  success: 'check-circle-fill',
  info: 'info-circle-fill',
  warning: 'warning-fill',
  error: 'x-octagon-fill',
  question: 'question-circle-fill',
}
