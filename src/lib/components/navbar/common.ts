import { type StyleValue } from 'vue'

export interface NavbarProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  flow?: boolean
}

export interface NavbarSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  left?(props: Record<string, never>): any
  right?(props: Record<string, never>): any
}

export interface NavbarItemProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface NavbarItemSlots {
  default?(props: Record<string, never>): any
}

export interface NavbarItemEmits {
  (e: 'click', event: any): void
}
