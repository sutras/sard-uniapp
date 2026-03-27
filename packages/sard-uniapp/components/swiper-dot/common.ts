import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface SwiperDotProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'dot' | 'dot-bar' | 'index' | 'title' | 'fraction'
  current?: number
  total?: number
  list?: any[]
  field?: string
}

export const defaultSwiperDotProps = (): DefaultProps<SwiperDotProps> => ({
  type: 'dot',
  current: 0,
  total: 0,
  field: 'title',
  ...defaultConfig.swiperDot,
})
