import { isNullish } from '../../utils'
import { InjectionKey, type StyleValue } from 'vue'

export interface CascaderFieldKeys {
  label?: string
  value?: string
  disabled?: string
  children?: string
  isLeaf?: string
}

export interface CascaderOption {
  label?: string
  value?: string | number
  disabled?: boolean
  children?: CascaderOption[]
  isLeaf?: boolean
  [key: PropertyKey]: any
}

export interface CascaderStateNode {
  label: string
  value: string | number
  key: string | number
  disabled: boolean
  children?: CascaderStateNode[]
  parent: CascaderStateNode | null
  isLeaf: boolean
  loadStatus: 'idle' | 'loading' | 'loaded'
  depth: number
  indeterminate: boolean
  checked: boolean
  selected: boolean
  option: CascaderOption
}

export type CascaderValue =
  | string
  | number
  | (string | number)[]
  | (string | number)[][]

export interface CascaderProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: CascaderValue
  options?: CascaderOption[]
  fieldKeys?: CascaderFieldKeys
  hintText?: string
  labelRender?: (option: CascaderOption) => string
  changeOnSelect?: boolean
  allLevels?: boolean
  multiple?: boolean
  checkStrictly?: boolean
  lazy?: boolean
  load?: (
    node?: CascaderStateNode,
  ) => Promise<CascaderOption[]> | CascaderOption[]
}

export const defaultCascaderProps = {
  options: () => [],
}

export interface CascaderSlots {
  top?(props: { tabIndex: number }): any
}

export interface CascaderEmits {
  (e: 'update:model-value', value: CascaderValue, selectedOptions: any[]): void
  (e: 'change', value: CascaderValue, selectedOptions: any[]): void
  (e: 'select', option: any, tabIndex: number): void
}

export interface CascaderPanel {
  nodes: CascaderStateNode[]
  selected: CascaderStateNode | null
}

export const defaultFieldKeys: CascaderFieldKeys = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
  isLeaf: 'isLeaf',
}

export function getSelectedOptionsByValue(
  options: CascaderOption[],
  value: CascaderValue,
  fieldKeys: Required<CascaderFieldKeys>,
  multiple?: boolean,
): CascaderOption[] | CascaderOption[][] | undefined {
  // 多选
  if (multiple) {
    if (Array.isArray(value)) {
      return value
        .map((item) => getSelectedOptionsByValue(options, item, fieldKeys))
        .filter((item) =>
          Array.isArray(item) ? item.length !== 0 : !isNullish(item),
        ) as CascaderOption[][]
    }
  }

  // 单选
  else {
    // 全路径
    if (Array.isArray(value)) {
      const selectedOptions: CascaderOption[] = []
      let list = options
      for (const item of value) {
        const option = list.find((option) => option[fieldKeys.value] === item)
        if (!option) break
        selectedOptions.push(option)
        list = option[fieldKeys.children]
        if (!Array.isArray(list)) break
      }
      return selectedOptions
    }

    // 最后一级
    else {
      for (const option of options) {
        // 优先在子结点中查找，找到后再向上回溯路径
        // 这样可以处理存在重复值场景时候更偏向于更深层次的选项
        if (Array.isArray(option[fieldKeys.children])) {
          const selectedOptions = getSelectedOptionsByValue(
            option[fieldKeys.children],
            value,
            fieldKeys,
            multiple,
          )
          if (selectedOptions) {
            return [option, ...selectedOptions]
          }
        }

        if (option[fieldKeys.value] === value) {
          return [option]
        }
      }
    }
  }
}

export const cascaderOptionsContextSymbol = Symbol(
  'cascader-options',
) as InjectionKey<{
  set: (options: CascaderOption[]) => void
}>
