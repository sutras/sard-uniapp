import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type BadgeProps } from '../badge'

export interface GridProps {
  rootStyle?: StyleValue
  rootClass?: string
  columns?: number
  gap?: string
  bordered?: boolean
  square?: boolean
  clickable?: boolean
  reverse?: boolean
  direction?: 'horizontal' | 'vertical'
}

export const defaultGridProps = defaultConfig.grid

export interface GridSlots {
  default?(props: Record<string, never>): any
}

export interface GridItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  contentStyle?: StyleValue
  contentClass?: string
  text?: string
  icon?: string
  iconSize?: string
  iconColor?: string
  iconFamily?: string
  dot?: boolean
  badge?: number | string
  badgeProps?: BadgeProps
}

export interface GridItemSlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  text?(props: Record<string, never>): any
}

export interface GridItemEmits {
  (e: 'click', event: any): void
}

export type GridContext = {
  columns: NonNullable<GridProps['columns']>
  gap: GridProps['gap']
  gutter: readonly [number, string]
}

export const gridSymbol = Symbol('grid')
