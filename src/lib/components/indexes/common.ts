import { type StyleValue } from 'vue'
import { type NodeRect } from '../../utils'

export interface IndexesProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: number | string
  hintDuration?: number
}

export interface IndexesSlots {
  default?(props: Record<string, never>): any
}

export interface IndexesEmits {
  (e: 'update:current', name: number | string): void
  (e: 'change', name: number | string): void
}

export interface IndexesExpose {
  scrollTo: (name: string | number) => void
  update: () => void
}

export interface IndexesAnchorProps {
  rootStyle?: StyleValue
  rootClass?: string
  name?: string | number
}

export interface IndexesAnchorSlots {
  default?(props: Record<string, never>): any
}

export interface IndexesNavProps {
  anchors: (string | number)[]
  current?: string | number
}

export interface IndexesNavSlots {
  default?(props: Record<string, never>): any
}

export interface IndexesNavEmits {
  (e: 'select', name: string | number): void
}

export interface IndexesContext {
  register: (name: string | number, getRect: () => Promise<NodeRect>) => void
  unregister: (name: string | number) => void
}

export const indexesContextSymbol = Symbol('indexes-context')
