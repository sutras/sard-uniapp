import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface MarqueeProps {
  rootStyle?: StyleValue
  rootClass?: string
  direction?: 'vertical' | 'horizontal'
  delay?: number
  speed?: number
}

export const marqueePropsDefaults = defaultConfig.marquee

export interface MarqueeSlots {
  default?(props: Record<string, never>): any
}

export interface MarqueeExpose {
  update: () => void
}
