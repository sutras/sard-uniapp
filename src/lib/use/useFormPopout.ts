import { ref, watch } from 'vue'
import { useTwoWayVisible } from './useTwoWayVisible'
import { useFormItemContext } from '../components/form'

export interface UsePopoutInputProps {
  visible?: boolean
  modelValue?: any
  validateEvent?: boolean
}

export interface UsePopoutInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', ...args: any[]): void
  (e: 'change', ...args: any[]): void
}

export function useFormPopout(
  props: UsePopoutInputProps,
  emit: UsePopoutInputEmits,
  options: {
    onChange?: (...args: any[]) => void
    onConfirmBefore?: () => void
  } = {},
) {
  // visible
  const { visible } = useTwoWayVisible(props, emit)

  // value
  const formItemContext = useFormItemContext()

  const innerValue = ref(props.modelValue)

  watch(
    () => props.modelValue,
    () => {
      innerValue.value = props.modelValue
      if (props.validateEvent) {
        formItemContext?.onChange()
      }
    },
  )

  const popoutValue = ref(props.modelValue)

  watch(innerValue, () => {
    popoutValue.value = innerValue.value
  })

  let restArgs: any[] = []

  const onChange = (value: any, ...args: any[]) => {
    popoutValue.value = value
    restArgs = args
    options.onChange?.(value, ...args)
  }

  const onConfirm = () => {
    options.onConfirmBefore?.()
    if (popoutValue.value !== innerValue.value) {
      innerValue.value = popoutValue.value
      const args = [innerValue.value, ...restArgs]
      emit('update:model-value', ...args)
      emit('change', ...args)
    }
  }

  return {
    innerVisible: visible,
    innerValue,
    popoutValue,
    onChange,
    onConfirm,
  }
}
