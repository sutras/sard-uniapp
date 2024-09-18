import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SwiperDotProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'dot' | 'dot-bar' | 'index' | 'title' | 'fraction'
  current?: number
  total?: number
  list?: any[]
  field?: string
}

export const defaultSwiperDotProps = defaultConfig.swiperDot
