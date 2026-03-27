import { type Ref, type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type NodeRect } from '../../utils'
import { type OptionKeys } from '../../use'

export interface SelectProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  multiple?: boolean
  multipleLimit?: number
  filterable?: boolean
  filterPlaceholder?: string
  filterMethod?: (query: string) => void
  remote?: boolean
  remoteMethod?: (
    query: string,
    page: number,
    isRefresh: boolean,
  ) => Promise<boolean>
  threshold?: number
  showToolbar?: boolean
  options?: any[]
  optionKeys?: OptionKeys
  valueKey?: string
  internalDefault?: number
}

export const defaultSelectProps = (): DefaultProps<SelectProps> => ({
  multipleLimit: 0,
  threshold: 500,
  ...defaultConfig.select,
  options: () => [],
})

export interface SelectSlots {
  default?(props: Record<string, never>): any
}

export interface SelectEmits {
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
  (e: 'select', value: any): void
}

export interface SelectExpose {}

export interface SelectItem {
  getRect: () => Promise<NodeRect>
  isSelected: any
  value: () => any
  disabled: boolean
}

export interface SelectContext {
  innerValue: any
  toggle: (value: any) => void
  multiple: Ref<boolean>
  multipleLimit: Ref<number>
  register: (selectItem: SelectItem) => void
  unregister: (selectItem: SelectItem) => void
  getEnabledValue: () => any[]
  selectItems: Ref<SelectItem[]>
  setToggle: (toggle: (value: any) => void) => void
  setSelect: (select: (value: any) => void) => void
}

export const selectContextSymbol = Symbol('select-context')
