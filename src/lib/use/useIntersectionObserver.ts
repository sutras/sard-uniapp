import {
  type ComponentInternalInstance,
  computed,
  getCurrentInstance,
  MaybeRef,
  onBeforeUnmount,
  onMounted,
  unref,
  watch,
} from 'vue'

interface IntersectionObserverOptions {
  root?: MaybeRef<string>
  selector?: MaybeRef<string>
  offsetTop?: MaybeRef<number | undefined>
  offsetBottom?: MaybeRef<number | undefined>
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
  const offsetTop = computed(() => -(unref(options.offsetTop) || 0))
  const offsetBottom = computed(() => -(unref(options.offsetBottom) || 0))

  const createObserver = () => {
    if (!selector.value) {
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
        top: offsetTop.value,
        bottom: offsetBottom.value,
      })
    } else {
      observer?.relativeToViewport({
        top: offsetTop.value,
        bottom: offsetBottom.value,
      })
    }

    observer?.observe(selector.value, callback)
  }

  watch([selector, root, offsetTop, offsetBottom], () => {
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
