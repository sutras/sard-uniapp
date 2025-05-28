import { type StyleValue } from 'vue'

export interface TabbarPitProps {
  rootStyle?: StyleValue
  rootClass?: string
  safeAreaInsetBottom?: boolean
}

export interface TabbarPitSlots {
  default?(props: Record<string, never>): any
}

export interface TabbarPitEmits {}

export interface TabbarPitExpose {}
