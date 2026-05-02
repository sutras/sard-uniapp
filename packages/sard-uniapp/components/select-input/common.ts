import { type DefaultProps, defaultConfig } from '../config'
import {
  type SelectPopoutEmits,
  type SelectPopoutProps,
  type SelectPopoutSlots,
  defaultSelectPopoutProps,
} from '../select-popout/common'
import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'

export interface SelectInputProps
  extends SelectPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  valueOnClear?: () => any
  maxLabels?: number
  mapLabel?: Record<any, any>
}

export const defaultSelectInputProps = (): DefaultProps<SelectInputProps> => ({
  ...defaultSelectPopoutProps(),
  maxLabels: 10,
  ...defaultConfig.selectInput,
})

export interface SelectInputSlots extends SelectPopoutSlots, PopoutInputSlots {}

export interface SelectInputEmits extends SelectPopoutEmits {}

export interface SelectInputExpose {}
