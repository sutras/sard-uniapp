import { type NodeRect } from '../utils'

export interface ReferenceExpose {
  getRect: () => NodeRect | Promise<NodeRect> | undefined
}

export interface PopoverContext {
  show: () => void
  register: (expose: ReferenceExpose) => void
}

export const popoverContextSymbol = Symbol('popover-context')
