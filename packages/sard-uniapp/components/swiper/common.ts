import { type StyleValue } from 'vue'

import { type DefaultProps, defaultConfig } from '../config'
import { type SwiperDotProps } from '../swiper-dot'

export interface SwiperItem {
  image?: string
  title?: string
  video?: string
  poster?: string
}

export interface SwiperProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: number
  list: (string | SwiperItem)[]
  showDot?: boolean
  dotType?: SwiperDotProps['type']
  autoplay?: boolean
  interval?: number
  duration?: number
  circular?: boolean
  previousMargin?: string
  nextMargin?: string
  displayMultipleItems?: number
  swiperItemStyle?: StyleValue
  itemStyle?: StyleValue
  dynamicItemStyle?: (index: number, activeIndex: number) => StyleValue
}

export const defaultSwiperProps = (): DefaultProps<SwiperProps> => ({
  showDot: true,
  dotType: 'dot',
  list: () => [],
  autoplay: true,
  interval: 5000,
  duration: 500,
  circular: false,
  displayMultipleItems: 1,
  ...defaultConfig.swiper,
})

export interface SwiperSlots {
  default?(props: Record<string, never>): any
}

export interface SwiperEmits {
  (e: 'click', index: number): void
  (e: 'update:model-value', index: number): void
  (e: 'change', index: number): void
}

export interface SwiperExpose {}
