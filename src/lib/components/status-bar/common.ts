import { type StyleValue } from 'vue'

export interface StatusBarProps {
  rootStyle?: StyleValue
  rootClass?: string
  height?: string
}

export interface StatusBarSlots {
  default?(props: Record<string, never>): any
}

export interface StatusBarEmits {}

export interface StatusBarExpose {}
