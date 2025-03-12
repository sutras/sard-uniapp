import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface TabbarProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: number | string
  color?: string
  activeColor?: string
  bordered?: boolean
}

export const defaultTabbarProps = defaultConfig.tabbar

export interface TabbarSlots {
  default?(props: Record<string, never>): any
}

export interface TabbarEmits {
  (e: 'update:current', current: number | string): void
  (e: 'change', current: number | string): void
}

export interface TabbarItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  name?: string | number
  icon?: string
  iconFamily?: string
  iconSize?: string
  badge?: number | string
  dot?: boolean
  text?: string
}

export interface TabbarItemSlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
}

export interface TabbarItemEmits {
  (e: 'click', event: any): void
}

export interface TabbarContext {
  color: TabbarProps['color']
  activeColor: TabbarProps['activeColor']
  current: any
  select: (name: string | number) => void
}

export const tabbarContextSymbol = Symbol('tabbar-context')
