import { type StyleValue } from 'vue'
import { type MenuOption } from '../menu/common'
import { type NodeRect } from '../../utils'
import { PopoverController } from './usePopover'
import { type Position } from './utils'
import { defaultConfig } from '../config'

export interface PopoverProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  options?: MenuOption[]
  position?: Position
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  refGap?: number
  viewportGap?: number
  transparent?: boolean
  controller?: PopoverController
  duration?: number
}

export const defaultPopoverProps = defaultConfig.popover

export interface PopoverSlots {
  default?(props: Record<string, never>): any
  content?(props: Record<string, never>): any
}

export interface PopoverEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'select', option: MenuOption): void
}

export interface ReferenceExpose {
  getRect: () => NodeRect | Promise<NodeRect> | undefined
}

export interface PopoverReferenceProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface PopoverReferenceSlots {
  default?(props: Record<string, never>): any
}

export interface PopoverReferenceEmits {
  (e: 'click', event: any): void
}

export interface PopoverContext {
  show: () => void
  register: (expose: ReferenceExpose) => void
}

export const popoverContextSymbol = Symbol('popover-context')
