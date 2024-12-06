import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ButtonProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'default' | 'pale' | 'mild' | 'outline' | 'text' | 'pale-text'
  theme?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'neutral'
  size?: 'mini' | 'small' | 'medium' | 'large'
  round?: boolean
  disabled?: boolean
  loading?: boolean
  loadingType?: 'clock' | 'circular'
  color?: string
  background?: string

  // 小程序能力
  formType?: string
  openType?: string
  appParameter?: string
  hoverStopPropagation?: boolean
  lang?: string
  sessionFrom?: string
  sendMessageTitle?: string
  sendMessagePath?: string
  sendMessageImg?: string
  showMessageCard?: boolean
  groupId?: string
  guildId?: string
  publicId?: string
}

export const defaultButtonProps = defaultConfig.button

export interface ButtonSlots {
  default?(props: Record<string, never>): any
}

export interface ButtonEmits {
  (e: 'click', event: any): void

  // 小程序能力
  (e: 'getphonenumber', event: any): void
  (e: 'getuserinfo', event: any): void
  (e: 'error', event: any): void
  (e: 'opensetting', event: any): void
  (e: 'launchapp', event: any): void
  (e: 'contact', event: any): void
  (e: 'chooseavatar', event: any): void
  (e: 'agreeprivacyauthorization', event: any): void
  (e: 'addgroupapp', event: any): void
  (e: 'chooseaddress', event: any): void
  (e: 'chooseinvoicetitle', event: any): void
  (e: 'subscribe', event: any): void
  (e: 'login', event: any): void
}
