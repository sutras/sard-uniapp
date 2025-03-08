import { type StyleValue } from 'vue'

export interface NavbarProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  flow?: boolean
  showBack?: boolean
  backText?: string
  fixed?: boolean
  statusBar?: boolean
}

export interface NavbarSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  left?(props: Record<string, never>): any
  right?(props: Record<string, never>): any
}

export interface NavbarEmits {
  (e: 'back', event: any): void
}

export interface NavbarItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  text?: string
  icon?: string
  iconFamily?: string
  iconSize?: string
  reverse?: boolean
}

export interface NavbarItemSlots {
  default?(props: Record<string, never>): any
}

export interface NavbarItemEmits {
  (e: 'click', event: any): void
}
