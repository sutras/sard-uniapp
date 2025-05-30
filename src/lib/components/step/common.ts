import { type StyleValue } from 'vue'
import { type StepsStatus } from '../steps/common'

export interface StepProps {
  rootStyle?: StyleValue
  rootClass?: string
  status?: StepsStatus
  name?: string
  description?: string
  index: number
}

export interface StepSlots {
  default?(props: { status: StepsStatus }): any
  icon?(props: { status: StepsStatus }): any
}

export interface StepEmits {}

export interface StepExpose {}
