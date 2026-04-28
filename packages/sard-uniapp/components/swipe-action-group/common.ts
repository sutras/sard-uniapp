import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type SwipeActionExpose } from '../swipe-action'

export interface SwipeActionGroupProps {
  rootStyle?: StyleValue
  rootClass?: string
  multiple?: boolean
}

export const defaultSwipeActionGroupProps =
  (): DefaultProps<SwipeActionGroupProps> => ({
    multiple: false,
    ...defaultConfig.swipeActionGroup,
  })

export interface SwipeActionGroupSlots {
  default?(props: Record<string, never>): any
}

export interface SwipeActionGroupExpose {
  closeAll: () => void
}

export interface SwipeActionGroupContext {
  multiple: SwipeActionGroupProps['multiple']
  register: (id: string, expose: SwipeActionExpose) => void
  unregister: (id: string) => void
  closeAll: (exceptId?: string) => void
}

export const swipeActionGroupContextSymbol = Symbol(
  'swipe-action-group-context',
)
