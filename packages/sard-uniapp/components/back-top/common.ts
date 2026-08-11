import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface BackTopProps {
  rootStyle?: StyleValue
  rootClass?: string
  scrollTop?: number
  visibleHeight?: number
  right?: string
  bottom?: string
}

export const defaultBackTopProps = (): DefaultProps<BackTopProps> => ({
  visibleHeight: 200,
  scrollTop: 0,
  ...defaultConfig.backTop,
})

export interface BackTopSlots {
  default?(props: Record<string, never>): any
}

export interface BackTopEmits {
  (e: 'click', event: any): void
}
