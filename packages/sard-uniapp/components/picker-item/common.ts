import { type StyleValue } from 'vue'

export interface PickerItemProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface PickerItemSlots {
  default?(props: Record<string, never>): any
}

export interface PickerItemEmits {}

export interface PickerItemExpose {}
