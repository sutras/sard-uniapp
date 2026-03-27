import { computed, ref, watch } from 'vue'
import { useTwoWayVisible } from './useTwoWayVisible'
import { omit } from '../utils'
import { type FormPopoutProps } from './useFormPopout'
import { defaultConfig } from '../components/config'
import { type TransitionHookName } from './useTransition'
import { type TransitionHookEmits } from '../components/popup/common'
import {
  type PopoutInputSlots,
  type PopoutInputProps,
} from '../components/popout-input/common'

export interface UsePopoutInputProps {
  visible?: boolean
  modelValue?: any
  valueOnClear?: () => any
}

export interface UsePopoutInputEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', ...args: any[]): void
  (e: 'change', ...args: any[]): void
}

export function pickPopoutInputProps(
  props: PopoutInputProps & {},
  slots: PopoutInputSlots & {},
) {
  return computed(() => ({
    rootStyle: props.rootStyle,
    rootClass: props.rootClass,
    placeholder: props.placeholder,
    readonly: props.readonly,
    disabled: props.disabled,
    clearable: props.clearable,
    loading: props.loading,
    multiline: props.multiline,
    arrow: props.arrow,
    arrowFamily: props.arrowFamily,
    inputProps: props.inputProps,
    internalPrepend: slots.prepend ? 1 : 0,
    internalAppend: slots.append ? 1 : 0,
    internalArrow: slots.arrow ? 1 : 0,
  }))
}

const popoutInputKeys: (keyof PopoutInputProps)[] = [
  'rootClass',
  'rootStyle',
  'placeholder',
  'readonly',
  'disabled',
  'clearable',
  'loading',
  'multiline',
  'arrow',
  'arrowFamily',
  'inputProps',
  'internalPrepend',
  'internalAppend',
  'internalArrow',
] as const

export function omitPopoutInputProps(
  props: PopoutInputProps & FormPopoutProps & {},
  keys: any[] = [],
) {
  return computed(() => ({
    ...omit(props, [...popoutInputKeys, ...keys]),
    title: props.title ?? props.placeholder,
  }))
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

  const onVisibleHook = (name: TransitionHookName) => {
    emit('visible-hook', name)
    emit(name as any)
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
    onVisibleHook,
  }
}
