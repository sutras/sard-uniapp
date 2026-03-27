import {
  MaybeRefOrGetter,
  onUnmounted,
  shallowReadonly,
  shallowRef,
  toValue,
} from 'vue'

export interface UseTimeoutFnOptions {
  immediate?: boolean
  immediateCallback?: boolean
}

export function useTimeout<CallbackFn extends (...args: any[]) => any>(
  cb: CallbackFn,
  interval: MaybeRefOrGetter<number>,
  options: UseTimeoutFnOptions = {},
) {
  const { immediate = false, immediateCallback = false } = options

  const isPending = shallowRef(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    isPending.value = false
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    if (immediateCallback) cb()
    clear()
    isPending.value = true
    timer = setTimeout(() => {
      isPending.value = false
      timer = null

      cb(...args)
    }, toValue(interval))
  }

  if (immediate) {
    start()
  }

  onUnmounted(() => {
    stop()
  })

  return {
    isPending: shallowReadonly(isPending),
    start,
    stop,
  }
}

export const useSetTimeout = useTimeout
