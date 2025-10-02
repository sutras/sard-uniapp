import { type NodeRect } from '../../utils'
import { type StyleValue } from 'vue'

export interface ScrollSpyProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: string | number
  offset?: number
  upperThreshold?: number | string
  lowerThreshold?: number | string
  disabled?: boolean
}

export interface ScrollSpySlots {
  default?(props: Record<string, never>): any
}

export interface ScrollSpyEmits {
  (e: 'update:current', name: number | string): void
  (e: 'change', name: number | string): void
  (e: 'scrolltoupper'): void
  (e: 'scrolltolower'): void
  (e: 'scroll', event: any): void
}

export interface ScrollSpyExpose {
  scrollTo: (name: string | number) => void
  update: () => void
}

export interface ScrollSpyContext {
  register: (name: string | number, getRect: () => Promise<NodeRect>) => void
  unregister: (name: string | number) => void
}

export const scrollSpyContextSymbol = Symbol('scroll-spy-context')
