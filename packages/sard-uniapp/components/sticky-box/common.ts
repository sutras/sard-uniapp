import { type Size } from '../../utils'
import {
  type ComponentInternalInstance,
  type InjectionKey,
  type StyleValue,
} from 'vue'

export interface StickyBoxProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface StickyBoxSlots {
  default?(props: Record<string, never>): any
}

export interface StickyBoxEmits {}

export interface StickyBoxExpose {}

export const stickyContextSymbol = Symbol('sticky-context') as InjectionKey<{
  boxId: string
  onResize: (callback: (size: Size) => void) => void
  offResize: (callback: (size: Size) => void) => void
  instance: ComponentInternalInstance
}>
