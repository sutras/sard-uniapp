import { type StyleValue } from 'vue'

export interface SelectOptionProps {
  rootStyle?: StyleValue
  rootClass?: string
  label?: string | number
  value?: string | number | boolean | object
  disabled?: boolean
  plain?: boolean
}

export const defaultSelectOptionProps = () => ({})

export interface SelectOptionSlots {
  default?(props: { disabled: boolean; selected: boolean }): any
  label?(props: { disabled: boolean; selected: boolean }): any
}

export interface SelectOptionEmits {
  (e: 'click', event: any): void
}

export interface SelectOptionExpose {}
