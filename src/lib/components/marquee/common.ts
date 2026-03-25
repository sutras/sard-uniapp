import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface MarqueeProps {
  rootStyle?: StyleValue
  rootClass?: string
  direction?: 'vertical' | 'horizontal'
  delay?: number
  speed?: number
}

export const defaultMarqueeProps = (): DefaultProps<MarqueeProps> => ({
  direction: 'vertical',
  delay: 1000,
  speed: 50,
  ...defaultConfig.marquee,
})

export interface MarqueeSlots {
  default?(props: Record<string, never>): any
}

export interface MarqueeExpose {
  update: () => void
}
