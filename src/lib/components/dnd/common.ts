import { type NodeRect } from '../../utils'
import { type UnwrapRef, type InjectionKey, type StyleValue } from 'vue'

export interface DndProps<T> {
  rootStyle?: StyleValue
  rootClass?: string
  list?: T[]
}

export interface DndSlots<T> {
  default?(props: { list: DndListItem<T>[] }): any
}

export interface DndEmits<T> {
  'item-drag-start': [event: { itemIndex: number }]
  'item-drag-move': [event: { itemIndex: number; insertIndex: number }]
  'item-drop': [event: { itemIndex: number; insertIndex: number }]
  'update:list': [list: T[]]
}

export interface DndExpose {}

export interface DndListItem<T> {
  data: UnwrapRef<T>
  itemInfo: DndItemInfo
  key: string
}

export interface DndItemInfo {
  offset: number
  dragging: boolean
}

export interface DndContext<T> {
  list: DndListItem<T>[]
  dragging: boolean
  currentHeight: number
  dragStart: (itemIndex: number) => void
  dragMove: (itemIndex: number, insertIndex: number) => void
  drop: (itemIndex: number, insertIndex: number) => void
  rectItems: (() => Promise<NodeRect>)[]
  addRectItem: (getRect: () => Promise<NodeRect>) => void
  removeRectItem: (getRect: () => Promise<NodeRect>) => void
}

export const dndContextKey = Symbol('dnd-context') as InjectionKey<
  DndContext<any>
>
