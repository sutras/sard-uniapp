import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface NoticeBarProps {
  rootStyle?: StyleValue
  rootClass?: string
  color?: string
  background?: string
  hideLeftIcon?: boolean
  delay?: number
  speed?: number
  scrollable?: 'auto' | 'never' | 'always'
  wrap?: boolean
  closable?: boolean
  linkable?: boolean
  visible?: boolean
  vertical?: boolean
}

export const noticeBarPropsDefaults = defaultConfig.noticeBar

export interface NoticeBarSlots {
  default?(props: Record<string, never>): any
  'left-icon'?(props: Record<string, never>): any
  'right-icon'?(props: Record<string, never>): any
}

export interface NoticeBarEmits {
  (e: 'click', event: any): void
  (e: 'close'): void
}
