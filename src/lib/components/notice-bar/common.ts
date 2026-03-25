import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

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

export const defaultNoticeBarProps = (): DefaultProps<NoticeBarProps> => ({
  delay: 1000,
  speed: 50,
  scrollable: 'auto',
  visible: true,
  ...defaultConfig.noticeBar,
})

export interface NoticeBarSlots {
  default?(props: Record<string, never>): any
  'left-icon'?(props: Record<string, never>): any
  'right-icon'?(props: Record<string, never>): any
}

export interface NoticeBarEmits {
  (e: 'click', event: any): void
  (e: 'close'): void
}

export interface NoticeBarExpose {
  update: () => void
}
