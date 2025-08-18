import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface CoolIconProps {
  rootStyle?: StyleValue
  rootClass?: string
  shape?: 'circle' | 'square' | 'oval' | 'triangle' | 'flower'
  size?: string
  iconSize?: string
  color?: string
  background?: string
}

export const defaultCoolIconProps = defaultConfig.coolIcon

export interface CoolIconSlots {
  default?(props: Record<string, never>): any
}

export interface CoolIconEmits {
  (e: 'click', event: any): void
}

export interface CoolIconExpose {}
