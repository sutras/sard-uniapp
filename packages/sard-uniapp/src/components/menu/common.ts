import { type StyleValue } from 'vue'

export interface MenuOption {
  text?: string
  disabled?: boolean
  icon?: string
  iconFamily?: string
  [prop: PropertyKey]: any
}

export interface MenuProps {
  rootStyle?: StyleValue
  rootClass?: string
  options?: MenuOption[]
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
}

export const menuPropsDefaults = {
  options: () => [],
}

export interface MenuEmits {
  (e: 'select', option: MenuOption): void
}

export interface MenuItemProps {
  text?: string
  disabled?: boolean
  icon?: string
  iconFamily?: string
  withIcon?: boolean
  direction?: 'vertical' | 'horizontal'
}

export interface MenuItemEmits {
  (e: 'click', event: any): void
}
