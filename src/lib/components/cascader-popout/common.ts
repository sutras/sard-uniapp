import { type StyleValue } from 'vue'
import { type CascaderOption, type CascaderProps } from '../cascader/common'
import { defaultConfig } from '../config'

export interface CascaderPopoutProps extends CascaderProps {
  visible?: boolean
  title?: string
  showConfirm?: boolean
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultCascaderPopoutProps = defaultConfig.cascaderPopout

export interface CascaderPopoutSlots {
  top?(props: { tabIndex: number }): any
}

export interface CascaderPopoutEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any, selectedOptions: CascaderOption[]): void
  (e: 'change', value: any, selectedOptions: CascaderOption[]): void
  (e: 'select', option: CascaderOption, tabIndex: number): void
}

export interface CascaderPopoutExpose {}
