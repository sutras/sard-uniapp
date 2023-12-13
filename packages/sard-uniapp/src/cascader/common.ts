import { type PropType, type StyleValue } from 'vue'

export interface CascaderFieldNames {
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
  fieldNames?: CascaderFieldNames
  hintText?: string
  labelRender?: (option: CascaderOption) => string
}

// const props = withDefaults(defineProps<CascaderProps>(), {
//   options: () => [],
// })

export const cascaderProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: [String, Number],
  options: {
    type: Array as PropType<CascaderProps['options']>,
    default: () => [] as PropType<CascaderProps['options']>,
  },
  fieldNames: Object as PropType<CascaderProps['fieldNames']>,
  hintText: String,
  labelRender: Function as PropType<CascaderProps['labelRender']>,
}

export interface CascaderSlots {
  top(props: { tabIndex: number }): any
}

export interface CascaderEmits {
  (
    e: 'update:model-value',
    value: string | number,
    selectedOptions: CascaderOption[],
  ): void
  (e: 'select', option: CascaderOption, tabIndex: number): void
}

export interface CascaderTab {
  options: CascaderOption[]
  selected: CascaderOption | null
}

export const defaultFieldNames: CascaderFieldNames = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
}

export function getSelectedOptionsByValue(
  options: CascaderOption[],
  value: string | number,
  fieldNames: Required<CascaderFieldNames>,
): CascaderOption[] | undefined {
  for (const option of options) {
    if (option[fieldNames.value] === value) {
      return [option]
    }

    if (Array.isArray(option[fieldNames.children])) {
      const selectedOptions = getSelectedOptionsByValue(
        option[fieldNames.children],
        value,
        fieldNames,
      )
      if (selectedOptions) {
        return [option, ...selectedOptions]
      }
    }
  }
}
