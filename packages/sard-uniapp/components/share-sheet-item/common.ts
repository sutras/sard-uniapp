export interface ShareSheetItemProps {
  name?: string
  description?: string
  color?: string
  background?: string
  icon?: string
  iconFamily?: string
  disabled?: boolean
}

export interface ShareSheetItemEmits {
  (e: 'click'): void
}

export interface ShareSheetItemSlots {
  default?(props?: Record<string, never>): any
  name?(props?: Record<string, never>): any
  description?(props?: Record<string, never>): any
  icon?(props?: Record<string, never>): any
}
