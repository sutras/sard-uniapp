import { type StyleValue } from 'vue'

export interface MenuOption {
  text?: string
  disabled?: boolean
  icon?: string
  iconFamily?: string
  [prop: PropertyKey]: any
}

export interface MenuProps<T extends MenuOption> {
  rootStyle?: StyleValue
  rootClass?: string
  options?: T[]
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
}

export const defaultMenuProps = {
  options: () => [],
}

export interface MenuEmits<T extends MenuOption> {
  (e: 'select', option: T): void
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
