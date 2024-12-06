import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface AlertProps {
  rootStyle?: StyleValue
  rootClass?: string
  showIcon?: boolean
  closable?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger'
  color?: string
  background?: string
}

export const defaultAlertProps = defaultConfig.alert

export interface AlertSlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
}

export interface AlertEmits {
  (e: 'close'): void
}

export const mapTypeIcon = {
  primary: 'info-circle-fill',
  success: 'check-circle-fill',
  warning: 'warning-fill',
  danger: 'x-circle-fill',
}
