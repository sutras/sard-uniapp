import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface FabProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  top?: string
  right?: string
  bottom?: string
  left?: string
  color?: string
  background?: string
  icon?: string
  visibleIcon?: string
  iconFamily?: string
  itemList?: FabItem[]
  hideName?: boolean
  overlayClosable?: boolean
  duration?: number

  draggable?: boolean
  axis?: 'x' | 'y' | 'both' | 'none'
  magnet?: 'x' | 'y'
  gapX?: number
  gapY?: number
  offset?: { x: number; y: number }
  navbarHeight?: number
  tabbarHeight?: number
}

export const defaultFabProps = () => ({
  ...defaultConfig.fab,
  itemList: () => [],
})

export interface FabSlots {
  default?(props: { visible: boolean }): any
  list?(props: { onItemClick: (item: FabItem, index: number) => void }): any
}

export interface FabEmits {
  (e: 'click', event: any): void
  (e: 'select', item: FabItem, index: number): void
  (e: 'update:offset', offset: { x: number; y: number }): void
}

export interface FabItem {
  name?: string
  color?: string
  background?: string
  icon?: string
  iconFamily?: string
  [key: PropertyKey]: any
}

export interface FabContext {
  hideName?: boolean
  visible?: boolean
  isLeft?: boolean
  onItemClick: (item: FabItem, index: number) => void
}

export const fabContextSymbol = Symbol('fab-context')
