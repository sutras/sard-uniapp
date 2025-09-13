import { type StyleValue } from 'vue'
import { type FabItem } from '../fab/common'

export interface FabItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  name?: string
  color?: string
  background?: string
  icon?: string
  iconFamily?: string
  isEntry?: boolean
  index?: number
  item?: FabItem
}

export const defaultFabItemProps = {}

export interface FabItemSlots {
  default?(props: Record<string, never>): any
}

export interface FabItemEmits {
  (e: 'click', event: any): void
}

export interface FabItemExpose {}
