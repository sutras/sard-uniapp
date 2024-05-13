import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'

export interface StepsItem {
  status?: StepsStatus
  name?: string
  description?: string
}

export interface StepsProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: number
  itemList?: StepsItem[]
  center?: boolean
  direction?: 'vertical' | 'horizontal'
  status?: StepsStatus
  iconFamily?: string
  iconSize?: string
  finishIcon?: string
  processIcon?: string
  waitIcon?: string
  errorIcon?: string
}

export const stepsPropsDefaults = defaultConfig.steps
