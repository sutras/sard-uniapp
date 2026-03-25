import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'
import { type DefaultProps, defaultConfig } from '../config'
import {
  type CascaderPopoutProps,
  type CascaderPopoutEmits,
  type CascaderPopoutSlots,
} from '../cascader-popout/common'

export interface CascaderInputProps
  extends CascaderPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  valueOnClear?: () => any
  maxRows?: number
}

export const defaultCascaderInputProps =
  (): DefaultProps<CascaderInputProps> => ({
    showConfirm: true,
    validateEvent: true,
    ...defaultConfig.cascaderPopout,
    maxRows: 3,
    ...defaultConfig.cascaderInput,
  })

export interface CascaderInputSlots
  extends CascaderPopoutSlots,
    PopoutInputSlots {}

export interface CascaderInputEmits extends CascaderPopoutEmits {}
