import { type CascaderOption, type CascaderProps } from '../cascader/common'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'

export interface CascaderPopoutProps extends FormPopoutProps, CascaderProps {}

export const defaultCascaderPopoutProps =
  (): DefaultProps<CascaderPopoutProps> => ({
    showConfirm: true,
    validateEvent: true,
    ...defaultConfig.cascaderPopout,
  })

export interface CascaderPopoutSlots {
  top?(props: { tabIndex: number }): any
}

export interface CascaderPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any, selectedOptions: CascaderOption[]): void
  (e: 'change', value: any, selectedOptions: CascaderOption[]): void
  (e: 'select', option: CascaderOption, tabIndex: number): void
  (e: 'confirm'): void
}

export interface CascaderPopoutExpose {}
