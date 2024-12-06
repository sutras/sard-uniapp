import { type StyleValue } from 'vue'

export interface TimelineProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface TimelineSlots {
  default?(props: Record<string, never>): any
}

export interface TimelineItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  time?: string
  icon?: string
  iconFamily?: string
  iconColor?: string
}

export interface TimelineItemSlots {
  default?(props: Record<string, never>): any
  icon?(props: Record<string, never>): any
  title?(props: Record<string, never>): any
  time?(props: Record<string, never>): any
}
