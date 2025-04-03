import { type StyleValue } from 'vue'

export interface CardProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  extra?: string
  footer?: string
  hover?: boolean
}

export interface CardSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  extra?(props: Record<string, never>): any
  footer?(props: Record<string, never>): any
}

export interface CardEmits {
  (e: 'click', event: any): void
}
