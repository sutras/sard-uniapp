import { InjectionKey, type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type WaterfallItemInfo } from '../waterfall-item/common'

export interface WaterfallProps {
  rootStyle?: StyleValue
  rootClass?: string
  columns?: number
  columnGap?: number
  rowGap?: number
}

export const defaultWaterfallProps = defaultConfig.waterfall

export interface WaterfallSlots {
  default?(props: Record<string, never>): any
}

export interface WaterfallEmits {
  (e: 'load'): void
  (e: 'loadstart'): void
}

export interface WaterfallExpose {
  reflow: () => void
  onLoad: (handler: () => void) => void
}

export interface WaterfallContext {
  columnWidth: number
  addItem: (item: WaterfallItemInfo) => void
  removeItem: (item: WaterfallItemInfo) => void
  onItemLoad: () => void
}

export const waterfallContextKey = Symbol(
  'waterfall-context',
) as InjectionKey<WaterfallContext>
