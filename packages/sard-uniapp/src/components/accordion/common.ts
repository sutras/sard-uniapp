import { type StyleValue } from 'vue'

export interface AccordionProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: (string | number)[] | string | number
  multiple?: boolean
}

export interface AccordionEmits {
  (e: 'update:model-value', event: any): void
}

export interface AccordionSlots {
  default?(props: Record<string, never>): any
}

export interface AccoridonContext {
  value: any
  multiple: AccordionProps['multiple']
  toggle: (name: string | number) => void
}

export const accoridonContextSymbol = Symbol('accoridon-context')

export interface AccordionItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  value?: string
  name?: string | number
  disabled?: boolean
}

export interface AccordionItemEmits {
  (e: 'click', event: any): void
}

export interface AccordionItemSlots {
  default?(props: Record<string, never>): any
}
