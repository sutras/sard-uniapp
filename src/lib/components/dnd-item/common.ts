import { InjectionKey, type StyleValue } from 'vue'
import { DndItemInfo } from '../dnd/common'

export interface DndItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  itemInfo: DndItemInfo
}

export interface DndItemSlots {
  default?(props: Record<string, never>): any
}

export interface DndItemEmits {}

export interface DndItemExpose {}

export interface DndItemContext {
  immediateStart: () => void
  start: () => void
  move: (delta: number) => void
  end: () => void
}

export const dndItemContextKey = Symbol(
  'dnd-item-context',
) as InjectionKey<DndItemContext>
