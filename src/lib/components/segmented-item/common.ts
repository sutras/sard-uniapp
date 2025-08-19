import { type StyleValue } from 'vue'

export interface SegmentedItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  label?: string | number
  value?: string | number | boolean
  icon?: string
  iconFamily?: string
  iconSize?: string
  disabled?: boolean
  readonly?: boolean
}

export const defaultSegmentedItemProps = {}

export interface SegmentedItemSlots {
  default?(props: Record<string, never>): any
}

export interface SegmentedItemEmits {
  (e: 'click', event: any): void
}

export interface SegmentedItemExpose {}
