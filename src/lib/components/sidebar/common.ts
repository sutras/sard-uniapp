import { type StyleValue } from 'vue'
import { type ScrollIntoViewOptions, type NodeRect } from '../../utils'

export interface SidebarProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: string | number
  round?: boolean
  line?: boolean
  scrollIntoViewOptions?: ScrollIntoViewOptions
}

export interface SidebarSlots {
  default?(props: Record<string, never>): any
}

export interface SidebarEmits {
  (e: 'update:current', name: string | number): void
  (e: 'change', name: string | number): void
}

export interface SidebarExpose {}

export interface SidebarContext {
  current: any
  select: (name: string | number, rect?: NodeRect) => void
  register: (name: string | number, getRect: () => Promise<NodeRect>) => void
  unregister: (name: string | number) => void
  round?: boolean
  line?: boolean
}

export const sidebarContextSymbol = Symbol('sidebar-context')
