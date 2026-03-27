import { computed, watch } from 'vue'
import { ref, Ref } from 'vue'
import { useTimeout } from './useTimeout'

export interface UseTimeoutLoadingOptions {
  leading?: number
  trailing?: number
}

export function useTimeoutLoading(
  loading: Ref<boolean>,
  options: UseTimeoutLoadingOptions = {},
) {
  const { leading = 150, trailing = 20000 } = options

  const status = ref<'idle' | 'leading' | 'loading' | 'trailing'>('idle')

  let startTime = 0

  let trailingDuration = 0

  const { start: waitTrailing, stop: cancelTrailing } = useTimeout(
    () => {
      status.value = 'idle'
    },
    () => trailingDuration,
  )

  const { start: waitLeading, stop: cancelLeading } = useTimeout(() => {
    status.value = 'loading'
    startTime = Date.now()
  }, leading)

  watch(loading, () => {
    cancelLeading()
    cancelTrailing()

    if (loading.value) {
      switch (status.value) {
        case 'idle':
          status.value = 'leading'
          waitLeading()
          break
        case 'trailing':
          status.value = 'loading'
          startTime = Date.now()
          break
      }
    } else {
      switch (status.value) {
        case 'leading':
          status.value = 'idle'
          break
        case 'loading': {
          const duration = Date.now() - startTime

          if (duration >= trailing) {
            status.value = 'idle'
          } else {
            status.value = 'trailing'
            trailingDuration = trailing - duration
            waitTrailing()
          }
          break
        }
      }
    }
  })

  const timeoutLoading = computed(() => {
    return status.value === 'loading' || status.value === 'trailing'
  })

  return timeoutLoading
}
