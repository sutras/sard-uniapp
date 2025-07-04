import { InjectionKey, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ListProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string | number
  description?: string | number
  inlaid?: boolean
  card?: boolean
  hideBorder?: boolean
}

export interface ListSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
}

export interface ListItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string | number
  description?: string | number
  value?: string | number
  hover?: boolean
  arrow?: boolean
  arrowDirection?: 'up' | 'right' | 'down'
  icon?: string
  iconSize?: string
  iconColor?: string
  iconFamily?: string
}

export const defaultListItemProps = defaultConfig.listItem

export interface ListItemEmits {
  (e: 'click', event: any): void
}

export interface ListItemSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  description?(props: Record<string, never>): any
  value?(props: Record<string, never>): any
  arrow?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
}

export interface ListContext {
  hideBorder?: boolean
}

export const listContextKey = Symbol(
  'list-context',
) as InjectionKey<ListContext>
