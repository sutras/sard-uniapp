import { type StyleValue } from 'vue'

export type SwipeActionVisible = 'left' | 'right' | false

export interface SwipeActionProps {
  rootStyle?: StyleValue
  rootClass?: string
  disabled?: boolean
  visible?: SwipeActionVisible
}

export interface SwipeActionSlots {
  default?(props: Record<string, never>): any
  left?(props: { hide: () => void }): any
  right?(props: { hide: () => void }): any
}

export interface SwipeActionEmits {
  (e: 'update:visible', value: SwipeActionVisible): void
}

export interface SwipeActionExpose {
  hide: () => void
}
