import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export interface IconProps {
  rootStyle?: StyleValue
  rootClass?: string
  name?: string
  family?: string
  size?: string
  color?: string
  separate?: boolean
}

export const defaultIconProps = (): DefaultProps<IconProps> => ({
  name: '',
  family: 'sari',
  separate: false,
  ...defaultConfig.icon,
})

export interface IconEmits {
  (e: 'click', event: any): void
}
