import { type StyleValue } from 'vue'

export interface ScrollSpyAnchorProps {
  rootStyle?: StyleValue
  rootClass?: string
  name: string | number
}

export interface ScrollSpyAnchorSlots {
  default?(props: Record<string, never>): any
}

export interface ScrollSpyAnchorEmits {}

export interface ScrollSpyAnchorExpose {}
