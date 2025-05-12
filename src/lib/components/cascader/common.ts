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
  modelValue?: string | number
  options?: CascaderOption[]
  fieldKeys?: CascaderFieldKeys
  hintText?: string
  labelRender?: (option: CascaderOption) => string
  changeOnSelect?: boolean
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
    value: string | number,
    selectedOptions: any[],
  ): void
  (e: 'change', value: string | number, selectedOptions: any[]): void
  (e: 'select', option: any, tabIndex: number): void
}

export interface CascaderTab {
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
  value: string | number,
  fieldKeys: Required<CascaderFieldKeys>,
): CascaderOption[] | undefined {
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
