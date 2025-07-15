import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../popout-input/common'
import { defaultConfig } from '../config'
import {
  type CascaderPopoutProps,
  type CascaderPopoutEmits,
  type CascaderPopoutSlots,
} from '../cascader-popout/common'

export interface CascaderInputProps
  extends CascaderPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  valueOnClear?: () => any
}

export const defaultCascaderInputProps = () => ({
  ...defaultConfig.cascaderPopout,
  ...defaultConfig.cascaderInput,
})

export interface CascaderInputSlots
  extends CascaderPopoutSlots,
    PopoutInputSlots {}

export interface CascaderInputEmits extends CascaderPopoutEmits {}
