import { type PropType, type StyleValue } from 'vue'

export interface AccordionProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: (string | number)[] | string | number
  multiple?: boolean
}

export const accordionProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: [String, Number, Array] as PropType<AccordionProps['modelValue']>,
  multiple: Boolean,
}

export interface AccordionEmits {
  (e: 'update:model-value', event: any): void
}

export interface AccordionSlots {
  default(props: Record<string, never>): any
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

export const accordionItemProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  title: String,
  value: String,
  name: [String, Number],
  disabled: Boolean,
}

export interface AccordionItemEmits {
  (e: 'click', event: any): void
}

export interface AccordionItemSlots {
  default(props: Record<string, never>): any
}
