import { type StyleValue } from 'vue'

import { type DefaultProps } from '../config'

export interface ShareSheetRowProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export const defaultShareSheetRowProps =
  (): DefaultProps<ShareSheetRowProps> => ({})

export interface ShareSheetRowSlots {
  default?(props: Record<string, never>): any
}

export interface ShareSheetRowEmits {}

export interface ShareSheetRowExpose {}
