import { type StyleValue } from 'vue'

export interface WaterfallItemProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface WaterfallItemSlots {
  default?(props: { onLoad: () => void; columnWidth: number }): any
}

export interface WaterfallItemEmits {}

export interface WaterfallItemExpose {}

export interface WaterfallItemInfo {
  height: number
  loaded: boolean
  visible: boolean
  top: number
  left: number
  beforeReflow: () => Promise<void>
}
