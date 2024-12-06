import { type StyleValue } from 'vue'

export interface RowProps {
  rootStyle?: StyleValue
  rootClass?: string
  gap?: number | string
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export interface RowSlots {
  default?(props: Record<string, never>): any
}

export interface ColProps {
  rootStyle?: StyleValue
  rootClass?: string
  span?: number | 'auto' | 'none'
  offset?: number
  order?: number
}

export interface ColSlots {
  default?(props: Record<string, never>): any
}

export type RowContext = {
  gutter: readonly [number, string]
  gap: RowProps['gap']
}

export const rowSymbol = Symbol('row-context')

export const mapJustify = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
}

export const mapAlign = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}
