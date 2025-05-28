import { ref, watch } from 'vue'

export interface UsePopoutInputVisibleProps {
  visible?: boolean
}

export interface UsePopoutInputVisibleEmits {
  (e: 'update:visible', visible: boolean): void
}

export function useTwoWayVisible(
  props: UsePopoutInputVisibleProps,
  emit: UsePopoutInputVisibleEmits,
) {
  const visible = ref(props.visible)

  watch(
    () => props.visible,
    () => {
      visible.value = props.visible
    },
  )

  watch(visible, () => {
    emit('update:visible', !!visible.value)
  })

  return {
    visible,
  }
}
