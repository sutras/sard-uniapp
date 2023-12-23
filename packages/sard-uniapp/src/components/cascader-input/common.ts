import {
  type CascaderProps,
  type CascaderOption,
  cascaderProps,
} from '../cascader/common'
import { defaultConfig } from '../config'
import { type PopoutInputProps, popoutInputProps } from '../popout-input/common'

export interface CascaderInputProps
  extends CascaderProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  showConfirm?: boolean
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<CascaderInputProps>(), {
//   showConfirm: false,
//   validateEvent: true,
// })

export const cascaderInputProps = {
  ...popoutInputProps,
  ...cascaderProps,
  visible: Boolean,
  title: String,
  showConfirm: {
    type: Boolean,
    default: defaultConfig.cascaderInput.showConfirm,
  },
  validateEvent: {
    type: Boolean,
    default: defaultConfig.cascaderInput.validateEvent,
  },
}

export interface CascaderInputSlots {
  top(props: { tabIndex: number }): any
}

export interface CascaderInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'select', option: CascaderOption, tabIndex: number): void
}
