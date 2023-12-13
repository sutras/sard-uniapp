import { type PropType, type StyleValue } from 'vue'

export interface NavbarProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  flow?: boolean
}

export const navbarProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  title: String,
  flow: Boolean,
}

export interface NavbarSlots {
  default(props: Record<string, never>): any
  title(props: Record<string, never>): any
  left(props: Record<string, never>): any
  right(props: Record<string, never>): any
}

export interface NavbarItemProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export const navbarItemProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
}

export interface NavbarItemSlots {
  default(props: Record<string, never>): any
}

export interface NavbarItemEmits {
  (e: 'click', event: any): void
}
