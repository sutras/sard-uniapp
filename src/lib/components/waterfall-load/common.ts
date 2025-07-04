import { type StyleValue } from 'vue'

export interface WaterfallLoadProps {
  rootStyle?: StyleValue
  rootClass?: string
  maxWait?: number
  width?: number
  height?: number
}

export interface WaterfallLoadSlots {
  default?(props: { onLoad: (event: any) => void; overtime: boolean }): any
}

export interface WaterfallLoadEmits {
  (e: 'load'): void
}

export interface WaterfallLoadExpose {}
