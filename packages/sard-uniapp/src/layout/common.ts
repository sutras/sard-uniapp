import { type PropType, type StyleValue } from 'vue'

export interface RowProps {
  rootStyle?: StyleValue
  rootClass?: string
  gap?: number | string
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const rowProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  gap: [Number, String],
  justify: String as PropType<RowProps['justify']>,
  align: String as PropType<RowProps['align']>,
}

export interface RowSlots {
  default(props: Record<string, never>): any
}

export interface ColProps {
  rootStyle?: StyleValue
  rootClass?: string
  span?: number | 'auto' | 'none'
  offset?: number
  order?: number
}

export const colProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  span: [Number, String] as PropType<ColProps['span']>,
  offset: Number,
  order: Number,
}

export interface ColSlots {
  default(props: Record<string, never>): any
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
