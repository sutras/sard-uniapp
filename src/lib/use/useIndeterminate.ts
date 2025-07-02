import { computed, MaybeRef, type Ref, ref, unref, watch } from 'vue'

export function useIndeterminate(
  value: Ref<any[]>,
  options: MaybeRef<{ label: any; value: any; disabled?: boolean }[]>,
) {
  const filterOptions = computed(() => {
    return unref(options).filter((option) => !option.disabled)
  })

  const checkedLength = computed(() => value.value?.length || 0)

  const optionsLength = computed(() => unref(filterOptions)?.length || 0)

  const allChecked = ref(false)

  const isIndeterminate = computed(() => {
    return checkedLength.value > 0 && checkedLength.value < optionsLength.value
  })

  const onAllChange = (checked: boolean) => {
    value.value = checked
      ? unref(filterOptions).map((option) => option.value)
      : []
  }

  watch(
    [checkedLength, optionsLength],
    () => {
      allChecked.value = checkedLength.value === optionsLength.value
    },
    {
      immediate: true,
    },
  )

  return {
    allChecked,
    isIndeterminate,
    onAllChange,
  }
}
