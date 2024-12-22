import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

// table
export interface TableProps {
  rootStyle?: StyleValue
  rootClass?: string
  bordered?: boolean
  underline?: boolean
  height?: string
}

export const defaultTableProps = defaultConfig.table

export interface TableSlots {
  default?(props: Record<string, never>): any
}

export interface TableContext {}

export const tableContextSymbol = Symbol('table-context')

// table-row
export interface TableRowProps {
  rootStyle?: StyleValue
  rootClass?: string
  fixed?: boolean
}

export interface TableRowSlots {
  default?(props: Record<string, never>): any
}

// table-cell
export interface TableCellProps {
  rootStyle?: StyleValue
  rootClass?: string
  width?: string
  bold?: boolean
  fixed?: boolean | 'left' | 'right'
}

export interface TableCellSlots {
  default?(props: Record<string, never>): any
}

// table-fixation
export interface TableFixationProps {
  rootStyle?: StyleValue
  rootClass?: string
  tableWidth?: number
  scrollY?: boolean
  height?: string
  bordered?: boolean
  underline?: boolean
}

export interface TableFixationSlots {
  default?(props: Record<string, never>): any
}

export type TableScrollSide = 'left' | 'middle' | 'right'

export interface TableFixationEmits {
  (e: 'scroll-side', side: TableScrollSide | null): void
}
