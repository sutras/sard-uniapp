import { type StyleValue } from 'vue'

export interface SidebarItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  name: string | number
  disabled?: boolean
}

export interface SidebarItemSlots {
  default?(props: Record<string, never>): any
}

export interface SidebarItemEmits {
  (e: 'click', event: any): void
}

export interface SidebarItemExpose {}
