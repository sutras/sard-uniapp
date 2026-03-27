import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  MaybeRef,
  MaybeRefOrGetter,
  onBeforeUnmount,
  onMounted,
  toValue,
  unref,
  watch,
} from 'vue'

interface IntersectionObserverOptions {
  root?: MaybeRef<string>
  selector?: MaybeRef<string>
  marginTop?: MaybeRefOrGetter<number | undefined>
  marginBottom?: MaybeRefOrGetter<number | undefined>
  disabled?: MaybeRefOrGetter<boolean | undefined>
  thresholds?: number[]
  initialRatio?: number
  observeAll?: boolean
  instance?: ComponentInternalInstance
}

export function useIntersectionObserver(
  callback: (result: UniApp.ObserveResult) => void,
  options: IntersectionObserverOptions = {},
) {
  const instance = getCurrentInstance()

  let observer: UniApp.IntersectionObserver | null = null

  const selector = computed(() => unref(options.selector))
  const root = computed(() => unref(options.root))
  const marginTop = computed(() => toValue(options.marginTop) || 0)
  const marginBottom = computed(() => toValue(options.marginBottom) || 0)
  const disabled = computed(() => toValue(options.disabled))

  const createObserver = () => {
    if (!selector.value || disabled.value) {
      return
    }

    observer = uni.createIntersectionObserver(
      options.instance?.proxy || instance?.proxy,
      {
        thresholds: options.thresholds,
        initialRatio: options.initialRatio,
        observeAll: options.observeAll,
      },
    )

    if (root.value) {
      observer?.relativeTo(root.value, {
        top: marginTop.value,
        bottom: marginBottom.value,
      })
    } else {
      observer?.relativeToViewport({
        top: marginTop.value,
        bottom: marginBottom.value,
      })
    }

    observer?.observe(selector.value, callback)
  }

  watch([selector, root, marginTop, marginBottom, disabled], () => {
    recreate()
  })

  const disconnect = () => {
    observer?.disconnect()
  }

  const recreate = () => {
    disconnect()
    createObserver()
  }

  onMounted(() => {
    createObserver()
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    recreate,
    disconnect,
  }
}
