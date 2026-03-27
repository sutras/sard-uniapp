import { type MaybeRef, computed, unref } from 'vue'
import { chainGet, isObject } from '../utils'

export interface OptionKeys {
  label?: string
  value?: string
  disabled?: string
  children?: string
  isLeaf?: string
}

export const defaultOptonKeys: Required<OptionKeys> = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
  isLeaf: 'isLeaf',
}

export function useOptionKeys(
  props: MaybeRef<{
    fieldKeys?: OptionKeys
    optionKeys?: OptionKeys
    valueKey?: any
  }>,
) {
  const aliasProps = computed(() => ({
    ...defaultOptonKeys,
    ...unref(props).fieldKeys,
    ...unref(props).optionKeys,
  }))
  const valueKey = computed(() => unref(props).valueKey)

  const getLabel = (option: any) => chainGet(option, aliasProps.value.label)
  const getValue = (option: any) => chainGet(option, aliasProps.value.value)
  const getIsLeaf = (option: any) => chainGet(option, aliasProps.value.isLeaf)
  const getDisabled = (option: any) =>
    chainGet(option, aliasProps.value.disabled)
  const getChildren = (option: any) =>
    chainGet(option, aliasProps.value.children)
  const getKey = (value: any) =>
    isObject(value) && valueKey.value ? chainGet(value, valueKey.value) : value

  return {
    aliasProps,
    getLabel,
    getValue,
    getIsLeaf,
    getDisabled,
    getChildren,
    getKey,
  }
}

export type UseOptionKeysReturn = ReturnType<typeof useOptionKeys>
