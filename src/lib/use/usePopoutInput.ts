import { ref, watch } from 'vue'
import { useTwoWayVisible } from './useTwoWayVisible'
import { defaultConfig } from '../components/config'

export interface UsePopoutInputProps {
  visible?: boolean
  modelValue?: any
  valueOnClear?: () => any
}

export interface UsePopoutInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', ...args: any[]): void
  (e: 'change', ...args: any[]): void
}

const defaultValueOnClear = () => undefined

export function usePopoutInput(
  props: UsePopoutInputProps,
  emit: UsePopoutInputEmits,
  options: {
    onClear?: (value: any) => void
  } = {},
) {
  // visible
  const { visible } = useTwoWayVisible(props, emit)

  const show = () => {
    visible.value = true
  }

  // value
  const innerValue = ref(props.modelValue)

  const getValueOnClear = () =>
    (props.valueOnClear || defaultConfig.valueOnClear || defaultValueOnClear)()

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
    innerValue.value = getValueOnClear()
    if (options.onClear) {
      options.onClear(innerValue.value)
    } else {
      emit('update:model-value', innerValue.value)
      emit('change', innerValue.value)
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
