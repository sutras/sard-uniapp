import { ref, watch } from 'vue'
import { useTwoWayVisible } from './useTwoWayVisible'

export interface UsePopoutInputProps {
  visible?: boolean
  modelValue?: any
}

export interface UsePopoutInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', ...args: any[]): void
  (e: 'change', ...args: any[]): void
}

export function usePopoutInput(
  props: UsePopoutInputProps,
  emit: UsePopoutInputEmits,
  options: {
    onClear?: () => void
  } = {},
) {
  // visible
  const { visible } = useTwoWayVisible(props, emit)

  const show = () => {
    visible.value = true
  }

  // value
  const innerValue = ref(props.modelValue)

  watch(
    () => props.modelValue,
    () => {
      innerValue.value = props.modelValue
    },
  )

  const onChange = (...args: any[]) => {
    emit('update:model-value', ...args)
    emit('change', ...args)
  }

  const onClear = () => {
    inputValue.value = ''
    innerValue.value = undefined
    if (options.onClear) {
      options.onClear()
    } else {
      emit('update:model-value', undefined)
      emit('change', undefined)
    }
  }

  // input
  const inputValue = ref('')

  return {
    innerVisible: visible,
    innerValue,
    inputValue,
    show,
    onChange,
    onClear,
  }
}
