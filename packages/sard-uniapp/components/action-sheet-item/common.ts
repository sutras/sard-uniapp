export interface ActionSheetItemProps {
  name?: string
  label?: string
  value?: any
  description?: string
  color?: string
  loading?: boolean
  disabled?: boolean
}

export type ActionSheetItem = ActionSheetItemProps

export interface ActionSheetItemEmits {
  (e: 'click'): void
}

export interface ActionSheetItemSlots {
  default?(props?: Record<string, never>): any
  label?(props?: Record<string, never>): any
  description?(props?: Record<string, never>): any
}
