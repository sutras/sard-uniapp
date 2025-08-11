import { InjectionKey, type StyleValue } from 'vue'
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
  reverse?: boolean
  status?: StepsStatus
  iconFamily?: string
  iconSize?: string
  finishIcon?: string
  processIcon?: string
  waitIcon?: string
  errorIcon?: string
}

export const defaultStepsProps = defaultConfig.steps

export interface StepsSlots {
  default?(props: Record<string, never>): any
}

export interface StepsContext {
  current: number
  center?: boolean
  direction?: StepsProps['direction']
  iconFamily?: string
  iconSize?: string
  finishIcon?: string
  processIcon?: string
  waitIcon?: string
  errorIcon?: string
  status?: StepsStatus
  reverse?: boolean
}

export const stepsContextSymbol = Symbol(
  'steps-context',
) as InjectionKey<StepsContext>
