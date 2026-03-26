import { type StyleValue } from 'vue'

import { type DefaultProps, defaultConfig } from '../config'

export interface CompactProps {
  rootStyle?: StyleValue
  rootClass?: string
  block?: boolean
  direction?: 'horizontal' | 'vertical'
}

export const defaultCompactProps = (): DefaultProps<CompactProps> => ({
  direction: 'horizontal',
  ...defaultConfig.compact,
})

export interface CompactSlots {
  default?(props: Record<string, never>): any
}

export interface CompactEmits {}

export interface CompactExpose {}

export interface CompactContext {
  items: any[]
  block: boolean
  direction: 'horizontal' | 'vertical'
  addItem: (item: any) => void
  removeItem: (item: any) => void
}

export const compactContextSymbol = Symbol('compact-context')
