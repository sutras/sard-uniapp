import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface PickerOptionKeys {
  label?: string
  value?: string
  children?: string
}

export interface PickerOptionObject {
  [key: PropertyKey]: any
}

export type PickerOption = PickerOptionObject | string | number

export interface PickerProps {
  rootStyle?: StyleValue
  rootClass?: string
  columns?: PickerOption[] | PickerOption[][]
  optionKeys?: PickerOptionKeys
  modelValue?: any
  immediateChange?: boolean
  internalCustom?: number
}

export const defaultPickerProps = () => ({
  ...defaultConfig.picker,
  columns: () => [],
})

export interface PickerSlots {
  custom?(props: {
    columns: any[][]
    value: number[]
    pickerViewClass: string
    maskClass: string
    indicatorClass: string
    onChange: (event: any) => void
  }): any
}

export interface PickerEmits {
  (
    e: 'update:model-value',
    value: any,
    selectedOptions: PickerOption[],
    indexes: number[],
  ): void
  (
    e: 'change',
    value: any,
    selectedOptions: PickerOption[],
    indexes: number[],
  ): void
}

export const defaultOptionKeys = {
  label: 'label',
  value: 'value',
  children: 'children',
}

export function getColumnsType(
  columns: PickerOption[] | PickerOption[][],
  optionKeys: Required<PickerOptionKeys>,
) {
  const firstColumn = columns[0]
  if (Array.isArray(firstColumn)) {
    return 'multi'
  }
  if (
    firstColumn &&
    typeof firstColumn === 'object' &&
    Array.isArray(firstColumn[optionKeys.children])
  ) {
    return 'cascader'
  }
  return 'single'
}

export function getValueOrLabelByOption(
  option: PickerOption,
  valueOrLabelKey: string,
) {
  const isPrimitive = option !== null && typeof option !== 'object'
  return (
    isPrimitive ? option : (option as PickerOptionObject)[valueOrLabelKey]
  ) as string | number
}

export function getValuesByOptions(options: PickerOption[], valueKey: string) {
  return options.map((option) => getValueOrLabelByOption(option, valueKey))
}

export function getOptionsByIndexes(
  indexes: number[],
  columns: PickerOption[] | PickerOption[][],
  optionKeys: Required<PickerOptionKeys>,
): PickerOption[] {
  function recurse(columns: PickerOption[], i = 0): PickerOption[] {
    const index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index]
    const nextColumn = option?.[optionKeys.children as keyof PickerOption]

    if (Array.isArray(nextColumn)) {
      return [option, ...recurse(nextColumn, ++i)]
    }
    return [option]
  }

  switch (getColumnsType(columns, optionKeys)) {
    case 'single':
      return [columns[indexes[0]]]
    case 'multi':
      return (columns as PickerOption[][]).map(
        (column, i) => column[indexes[i]],
      )
    case 'cascader':
      return recurse(columns)
  }
}

export function getCascaderValidIndexes(
  indexes: number[],
  columns: PickerOption[] | PickerOption[][],
  optionKeys: Required<PickerOptionKeys>,
) {
  function recurse(columns: PickerOption[], i = 0): number[] {
    let index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index] as PickerOptionObject
    if (!option) {
      index = 0
    }
    const nextColumn = option?.[optionKeys.children]

    if (Array.isArray(nextColumn)) {
      return [index, ...recurse(nextColumn, ++i)]
    }
    return [index]
  }
  return recurse(columns)
}

export function getMaySingleValueByOptions(
  options: PickerOption[],
  optionKeys: Required<PickerOptionKeys>,
  columns: PickerOption[] | PickerOption[][],
) {
  const values = getValuesByOptions(options, optionKeys.value)
  return getColumnsType(columns, optionKeys) === 'single' ? values[0] : values
}

export function getIndexesByValue(
  value: any[],
  columns: PickerOption[] | PickerOption[][],
  optionKeys: Required<PickerOptionKeys>,
) {
  const type = getColumnsType(columns, optionKeys)

  function recurse(columns: PickerOptionObject[], i = 0): number[] {
    let index = columns.findIndex(
      (option) => option[optionKeys.value] === value[i],
    )
    if (index === -1) {
      index = 0
    }
    const option = columns[index]

    const nextColumn: PickerOptionObject[] =
      option?.[optionKeys.children as 'children']

    if (Array.isArray(nextColumn)) {
      return [index, ...recurse(nextColumn, ++i)]
    }
    return [index]
  }

  if (type === 'cascader') {
    return recurse(columns as PickerOptionObject[])
  }

  if (type === 'single') {
    columns = [columns]
  }

  return (columns as PickerOption[][]).map((column, index) => {
    const optionIndex = column.findIndex(
      (option) =>
        getValueOrLabelByOption(option, optionKeys.value) === value[index],
    )
    return Math.max(optionIndex, 0)
  })
}

export function getInitialValue(
  columns: PickerOption[] | PickerOption[][],
  optionKeys: Required<PickerOptionKeys>,
) {
  function recurse(
    columns: PickerOption[],
    options: PickerOptionObject[],
  ): PickerOption {
    const option = columns[0] as PickerOptionObject
    options.push(option)
    const nextColumn = option?.[optionKeys.children]

    if (Array.isArray(nextColumn) && nextColumn.length > 0) {
      return recurse(nextColumn, options)
    }
    return option
  }

  switch (getColumnsType(columns, optionKeys)) {
    case 'single':
      return [
        getValueOrLabelByOption(columns[0], optionKeys.value),
        [columns[0]],
      ]
    case 'multi':
      return [
        (columns as PickerOption[][]).map((column) =>
          getValueOrLabelByOption(column[0], optionKeys.value),
        ),
        (columns as PickerOption[][]).map((column) => column[0]),
      ]
    case 'cascader': {
      const options: PickerOptionObject[] = []
      recurse(columns, options)
      return [
        options.map((option) =>
          getValueOrLabelByOption(option, optionKeys.value),
        ),
        options,
      ]
    }
  }
}
