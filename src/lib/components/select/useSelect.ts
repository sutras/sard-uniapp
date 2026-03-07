import { provide, ref, toRef, toValue } from 'vue'
import {
  type SelectContext,
  type SelectItem,
  selectContextSymbol,
} from './common'

export function useSelect(props: { multiple: boolean; multipleLimit: number }) {
  const innerValue = ref<any>(props.multiple ? [] : undefined)

  const selectItems = ref<SelectItem[]>([])

  const register = (selectItem: SelectItem) => {
    if (!selectItems.value.includes(selectItem)) {
      selectItems.value.push(selectItem)
    }
  }

  const unregister = (selectItem: SelectItem) => {
    const index = selectItems.value.indexOf(selectItem)
    if (index !== -1) {
      selectItems.value.splice(index, 1)
    }
  }

  const getEnabledValue = () => {
    return selectItems.value
      .filter((item) => !toValue(item.disabled))
      .map((item) => item.value())
  }

  let onToggle: ((value: any) => void) | null
  let onSelect: ((value: any) => void) | null

  const toggle = (value: any) => {
    let nextValue: any

    if (props.multiple) {
      nextValue = innerValue.value.includes(value)
        ? innerValue.value.filter((val: any) => val !== value)
        : innerValue.value.concat(value)
    } else {
      if (value === innerValue.value) {
        onSelect?.(value)
        return
      }
      nextValue = value
    }

    onToggle?.(nextValue)
    onSelect?.(value)
  }

  const setToggle = (toggle: (value: any) => void) => {
    onToggle = toggle
  }

  const setSelect = (select: (value: any) => void) => {
    onSelect = select
  }

  const context: SelectContext = {
    innerValue,
    toggle,
    multiple: toRef(() => props.multiple),
    multipleLimit: toRef(() => props.multipleLimit),
    register,
    unregister,
    getEnabledValue,
    selectItems,
    setToggle,
    setSelect,
  }

  provide<SelectContext>(selectContextSymbol, context)

  return context
}
