import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'
import {
  type CascaderPopoutProps,
  type CascaderPopoutEmits,
  type CascaderPopoutSlots,
} from '../cascader-popout/common'

export interface CascaderInputProps
  extends CascaderPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {}

export const defaultCascaderInputProps = () => ({
  ...defaultConfig.cascaderPopout,
})

export interface CascaderInputSlots extends CascaderPopoutSlots {}

export interface CascaderInputEmits extends CascaderPopoutEmits {}
