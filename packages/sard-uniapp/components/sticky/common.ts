import { type StyleValue } from 'vue'

export interface StickyProps {
  rootStyle?: StyleValue
  rootClass?: string
  offsetTop?: number
  offsetBottom?: number
  zIndex?: number | string
}

export interface StickySlots {
  default?(props: Record<string, never>): any
}

export interface StickyEmits {}

export interface StickyExpose {}
