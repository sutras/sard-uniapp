import { type StyleValue } from 'vue'
import { type CheckboxGroupProps } from '../checkbox/common'
import { defaultConfig } from '../config'

export interface CheckboxPopoutProps extends CheckboxGroupProps {
  visible?: boolean
  title?: string
  popoutClass?: string
  popoutStyle?: StyleValue
  showCheckAll?: boolean
  searchable?: boolean
  filterPlaceholder?: string
}

export const defaultCheckboxPopoutProps = () => ({
  ...defaultConfig.checkboxPopout,
  options: () => [],
})

export interface CheckboxPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface CheckboxPopoutEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
}

export interface CheckboxPopoutExpose {}
