import { defaultConfig } from '../config'

export interface CountToProps {
  value?: number
  precision?: number
  separator?: string
  separatorDigit?: number
  duration?: number
}

export const defaultCountToProps = defaultConfig.countTo
