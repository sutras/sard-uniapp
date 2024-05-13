import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

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

export const gridPropsDefaults = defaultConfig.grid

export interface GridSlots {
  default?(props: Record<string, never>): any
}

export interface GridItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  text?: string
  icon?: string
  iconSize?: string
  iconColor?: string
  iconFamily?: string
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
