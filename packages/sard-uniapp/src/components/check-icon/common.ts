import { StyleValue } from 'vue'

export interface CheckIconProps {
  rootStyle?: StyleValue
  rootClass?: string
  disabled?: boolean
  shape?: 'circle' | 'square'
  type?: 'empty' | 'check' | 'dot' | 'dash'
}
