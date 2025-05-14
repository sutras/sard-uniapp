import { type CascaderProps, type CascaderOption } from '../cascader/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'
import { type StyleValue } from 'vue'

export interface CascaderInputProps
  extends CascaderProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  showConfirm?: boolean
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultCascaderInputProps = defaultConfig.cascaderInput

export interface CascaderInputSlots {
  top?(props: { tabIndex: number }): any
}

export interface CascaderInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any, selectedOptions: CascaderOption[]): void
  (e: 'change', value: any, selectedOptions: CascaderOption[]): void
  (e: 'select', option: CascaderOption, tabIndex: number): void
}
