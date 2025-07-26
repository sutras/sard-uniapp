import { type StyleValue } from 'vue'

export interface CascaderFieldKeys {
  label?: string
  value?: string
  disabled?: string
  children?: string
}

export interface CascaderOption {
  label?: string
  value?: string | number
  disabled?: boolean
  children?: CascaderOption[]
  [key: PropertyKey]: any
}

export interface CascaderProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: string | number | (string | number)[]
  options?: CascaderOption[]
  fieldKeys?: CascaderFieldKeys
  hintText?: string
  labelRender?: (option: CascaderOption) => string
  changeOnSelect?: boolean
  allLevels?: boolean
}

export const defaultCascaderProps = {
  options: () => [],
}

export interface CascaderSlots {
  top?(props: { tabIndex: number }): any
}

export interface CascaderEmits {
  (
    e: 'update:model-value',
    value: string | number | (string | number)[],
    selectedOptions: any[],
  ): void
  (
    e: 'change',
    value: string | number | (string | number)[],
    selectedOptions: any[],
  ): void
  (e: 'select', option: any, tabIndex: number): void
}

export interface CascaderPanel {
  options: CascaderOption[]
  selected: CascaderOption | null
}

export const defaultFieldKeys: CascaderFieldKeys = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
}

export function getSelectedOptionsByValue(
  options: CascaderOption[],
  value: string | number | (string | number)[],
  fieldKeys: Required<CascaderFieldKeys>,
): CascaderOption[] | undefined {
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
  } else {
    for (const option of options) {
      if (option[fieldKeys.value] === value) {
        return [option]
      }

      if (Array.isArray(option[fieldKeys.children])) {
        const selectedOptions = getSelectedOptionsByValue(
          option[fieldKeys.children],
          value,
          fieldKeys,
        )
        if (selectedOptions) {
          return [option, ...selectedOptions]
        }
      }
    }
  }
}
