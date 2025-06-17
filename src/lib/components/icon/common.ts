import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface IconProps {
  rootStyle?: StyleValue
  rootClass?: string
  name?: string
  family?: string
  size?: string
  color?: string
  separate?: boolean
}

export const defaultIconProps = defaultConfig.icon
