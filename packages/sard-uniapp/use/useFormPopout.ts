import { type StyleValue, computed, ref, watch } from 'vue'
import { useTwoWayVisible } from './useTwoWayVisible'
import { useFormItemContext } from '../components/form'
import { type TransitionHookName } from './useTransition'
import { type TransitionHookEmits } from '../components/popup/common'
import { omit } from '../utils'

export interface UseFormPopoutProps {
  visible?: boolean
  modelValue?: any
  validateEvent?: boolean
  resettable?: boolean
}

export interface FormPopoutProps {
  visible?: boolean
  title?: string
  popoutClass?: string
  popoutStyle?: StyleValue
  resettable?: boolean
  validateEvent?: boolean
  showConfirm?: boolean
}

export function omitFormPopoutProps(props: {} & FormPopoutProps) {
  return computed(() =>
    omit(props, [
      'visible',
      'title',
      'popoutClass',
      'popoutStyle',
      'resettable',
      'validateEvent',
      'showConfirm',
    ]),
  )
}

export interface UseFormPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', ...args: any[]): void
  (e: 'change', ...args: any[]): void
  (e: 'confirm'): void
}

export function useFormPopout(
  props: UseFormPopoutProps,
  emit: UseFormPopoutEmits,
  options: {
    onChange?: (...args: any[]) => void
    onConfirmBefore?: () => any
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

  const onConfirm = (showConfirm = true) => {
    if (showConfirm) {
      emit('confirm')
    }
    const extraArgs = options.onConfirmBefore?.()
    if (extraArgs) {
      restArgs = extraArgs
    }
    if (popoutValue.value !== innerValue.value) {
      innerValue.value = popoutValue.value
      const args = [innerValue.value, ...restArgs]
      emit('update:model-value', ...args)
      emit('change', ...args)
    }
  }

  const onVisibleHook = (name: TransitionHookName) => {
    if (
      props.resettable &&
      name === 'after-leave' &&
      popoutValue.value !== innerValue.value
    ) {
      popoutValue.value = innerValue.value
    }
    emit('visible-hook', name)
    emit(name as any)
  }

  return {
    innerVisible: visible,
    innerValue,
    popoutValue,
    onChange,
    onConfirm,
    onVisibleHook,
  }
}
