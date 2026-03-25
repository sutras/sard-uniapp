import { type DefaultProps, defaultConfig } from '../config'

export interface CountToProps {
  value?: number
  precision?: number
  separator?: string
  separatorDigit?: number
  duration?: number
}

export const defaultCountToProps = (): DefaultProps<CountToProps> => ({
  value: 0,
  precision: 0,
  separatorDigit: 3,
  duration: 2000,
  ...defaultConfig.countTo,
})
