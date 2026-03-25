import { OptionKeys, UseOptionKeysReturn } from '../../use'
import { isNullish } from '../../utils'
import { InjectionKey, type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

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
  fieldKeys?: OptionKeys
  optionKeys?: OptionKeys
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

export const defaultCascaderProps = (): DefaultProps<CascaderProps> => ({
  ...defaultConfig.cascader,
  options: () => [],
})

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

export function getSelectedOptionsByValue(
  options: CascaderOption[],
  value: CascaderValue,
  useOptionKeysReturn: UseOptionKeysReturn,
  multiple?: boolean,
): CascaderOption[] | CascaderOption[][] | undefined {
  const { getValue, getChildren } = useOptionKeysReturn

  // 多选
  if (multiple) {
    if (Array.isArray(value)) {
      return value
        .map((item) =>
          getSelectedOptionsByValue(options, item, useOptionKeysReturn),
        )
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
        const option = list.find((option) => getValue(option) === item)
        if (!option) break
        selectedOptions.push(option)
        list = getChildren(option)
        if (!Array.isArray(list)) break
      }
      return selectedOptions
    }

    // 最后一级
    else {
      for (const option of options) {
        // 优先在子结点中查找，找到后再向上回溯路径
        // 这样可以处理存在重复值场景时候更偏向于更深层次的选项
        if (Array.isArray(getChildren(option))) {
          const selectedOptions = getSelectedOptionsByValue(
            getChildren(option),
            value,
            useOptionKeysReturn,
            multiple,
          )
          if (selectedOptions) {
            return [option, ...selectedOptions]
          }
        }

        if (getValue(option) === value) {
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
