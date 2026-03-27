import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface CardProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  extra?: string
  footer?: string
  hover?: boolean
  hideHeaderBorder?: boolean
  hideFooterBorder?: boolean
  collapsed?: boolean
}

export const defaultCardProps = (): DefaultProps<CardProps> => ({
  ...defaultConfig.card,
})

export interface CardSlots {
  default?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  extra?(props: Record<string, never>): any
  footer?(props: Record<string, never>): any
}

export interface CardEmits {
  (e: 'click', event: any): void
}
