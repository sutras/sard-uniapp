import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type OptionKeys, type UseOptionKeysReturn } from '../../use'

export interface PickerOptionObject {
  [key: PropertyKey]: any
}

export type PickerOption = PickerOptionObject | string | number

export interface PickerProps {
  rootStyle?: StyleValue
  rootClass?: string
  columns?: PickerOption[] | PickerOption[][]
  optionKeys?: OptionKeys
  modelValue?: any
  immediateChange?: boolean
  internalCustom?: number
}

export const defaultPickerProps = (): DefaultProps<PickerProps> => ({
  immediateChange: false,
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

export function getColumnsType(
  columns: PickerOption[] | PickerOption[][],
  { getChildren }: UseOptionKeysReturn,
) {
  const firstColumn = columns[0]
  if (Array.isArray(firstColumn)) {
    return 'multi'
  }
  if (
    firstColumn &&
    typeof firstColumn === 'object' &&
    Array.isArray(getChildren(firstColumn))
  ) {
    return 'cascader'
  }
  return 'single'
}

export function getOptionsByIndexes(
  indexes: number[],
  columns: PickerOption[] | PickerOption[][],
  useOptionKeysReturn: UseOptionKeysReturn,
): PickerOption[] {
  const { getChildren } = useOptionKeysReturn

  function recurse(columns: PickerOption[], i = 0): PickerOption[] {
    const index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index]
    const nextColumn = getChildren(option)

    if (Array.isArray(nextColumn)) {
      return [option, ...recurse(nextColumn, ++i)]
    }
    return [option]
  }

  switch (getColumnsType(columns, useOptionKeysReturn)) {
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
  { getChildren }: UseOptionKeysReturn,
) {
  function recurse(columns: PickerOption[], i = 0): number[] {
    let index = Math.min(indexes[i], columns.length - 1)
    const option = columns[index] as PickerOptionObject
    if (!option) {
      index = 0
    }
    const nextColumn = getChildren(option)

    if (Array.isArray(nextColumn)) {
      return [index, ...recurse(nextColumn, ++i)]
    }
    return [index]
  }
  return recurse(columns)
}

export function getMaySingleValueByOptions(
  options: PickerOption[],
  useOptionKeysReturn: UseOptionKeysReturn,
  columns: PickerOption[] | PickerOption[][],
) {
  const { getValue } = useOptionKeysReturn

  const values = options.map((option) => getValue(option))

  return getColumnsType(columns, useOptionKeysReturn) === 'single'
    ? values[0]
    : values
}

export function getIndexesByValue(
  value: any[],
  columns: PickerOption[] | PickerOption[][],
  useOptionKeysReturn: UseOptionKeysReturn,
) {
  const { getValue, getChildren } = useOptionKeysReturn
  const type = getColumnsType(columns, useOptionKeysReturn)

  function recurse(columns: PickerOptionObject[], i = 0): number[] {
    let index = columns.findIndex((option) => getValue(option) === value[i])
    if (index === -1) {
      index = 0
    }
    const option = columns[index]

    const nextColumn: PickerOptionObject[] = getChildren(option)

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
      (option) => getValue(option) === value[index],
    )
    return Math.max(optionIndex, 0)
  })
}

export function getInitialValue(
  columns: PickerOption[] | PickerOption[][],
  useOptionKeysReturn: UseOptionKeysReturn,
) {
  const { getChildren, getValue } = useOptionKeysReturn

  function recurse(
    columns: PickerOption[],
    options: PickerOptionObject[],
  ): PickerOption {
    const option = columns[0] as PickerOptionObject
    options.push(option)
    const nextColumn = getChildren(option)

    if (Array.isArray(nextColumn) && nextColumn.length > 0) {
      return recurse(nextColumn, options)
    }
    return option
  }

  switch (getColumnsType(columns, useOptionKeysReturn)) {
    case 'single':
      return [getValue(columns[0]), [columns[0]]]
    case 'multi':
      return [
        (columns as PickerOption[][]).map((column) => getValue(column[0])),
        (columns as PickerOption[][]).map((column) => column[0]),
      ]
    case 'cascader': {
      const options: PickerOptionObject[] = []
      recurse(columns, options)
      return [options.map((option) => getValue(option)), options]
    }
  }
}
