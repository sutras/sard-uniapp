import { type StyleValue } from 'vue'

export interface SelectOptionGroupProps {
  rootStyle?: StyleValue
  rootClass?: string
  label?: string | number
  disabled?: boolean
}

export const defaultSelectOptionGroupProps = () => ({})

export interface SelectOptionGroupSlots {
  default?(props: Record<string, never>): any
}

export interface SelectOptionGroupEmits {}

export interface SelectOptionGroupExpose {}

export interface SelectOptionGroupContext {
  disabled?: boolean
}

export const selectOptionGroupContextSymbol = Symbol(
  'select-option-group-context',
)
