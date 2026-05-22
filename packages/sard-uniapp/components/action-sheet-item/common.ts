export interface ActionSheetItemProps {
  name?: string
  description?: string
  color?: string
  loading?: boolean
  disabled?: boolean
}

export interface ActionSheetItemEmits {
  (e: 'click'): void
}

export interface ActionSheetItemSlots {
  default?(props?: Record<string, never>): any
  name?(props?: Record<string, never>): any
  description?(props?: Record<string, never>): any
}
