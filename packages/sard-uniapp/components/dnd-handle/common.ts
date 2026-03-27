import { type StyleValue } from 'vue'

export interface DndHandleProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface DndHandleSlots {
  default?(props: Record<string, never>): any
}

export interface DndHandleEmits {}

export interface DndHandleExpose {}
