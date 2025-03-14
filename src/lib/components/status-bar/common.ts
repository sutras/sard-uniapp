import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface StatusBarProps {
  rootStyle?: StyleValue
  rootClass?: string
  height?: string
  reverse?: boolean
}

export const defaultStatusBarProps = defaultConfig.statusBar

export interface StatusBarSlots {
  default?(props: Record<string, never>): any
}

export interface StatusBarEmits {}

export interface StatusBarExpose {}
