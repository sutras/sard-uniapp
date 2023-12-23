import { type PropType, type StyleValue } from 'vue'

export interface CardProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  extra?: string
  footer?: string
}

export const cardProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  title: String,
  extra: String,
  footer: String,
}

export interface CardEmits {
  (e: 'click', event: any): void
}

export interface CardSlots {
  default(props: Record<string, never>): any
  title(props: Record<string, never>): any
  extra(props: Record<string, never>): any
  footer(props: Record<string, never>): any
}
