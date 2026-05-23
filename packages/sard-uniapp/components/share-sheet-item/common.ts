export interface ShareSheetItemProps {
  name?: string
  label?: string
  value?: any
  description?: string
  color?: string
  background?: string
  icon?: string
  iconFamily?: string
  disabled?: boolean
}

export type ShareSheetItem = ShareSheetItemProps

export interface ShareSheetItemEmits {
  (e: 'click'): void
}

export interface ShareSheetItemSlots {
  default?(props?: Record<string, never>): any
  label?(props?: Record<string, never>): any
  description?(props?: Record<string, never>): any
  icon?(props?: Record<string, never>): any
}
