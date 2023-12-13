import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

export type TransitionHookName =
  | 'before-enter'
  | 'enter'
  | 'after-enter'
  | 'enter-cancelled'
  | 'before-leave'
  | 'leave'
  | 'after-leave'
  | 'leave-cancelled'

export interface TransitionOptions {
  visible?: boolean
  prefix?: string
  duration?: number | [number, number]
  enterFromClass?: string
  enterActiveClass?: string
  enterToClass?: string
  leaveFromClass?: string
  leaveActiveClass?: string
  leaveToClass?: string
  onVisibleHook?: (name: TransitionHookName) => void
}

function getDuration(duration: number | [number, number] = 0) {
  let enter: number, leave: number

  if (typeof duration === 'number') {
    enter = leave = duration
  } else {
    ;[enter, leave] = duration
  }
  return {
    enter,
    leave,
  }
}

const tickInterval = 30

export function useTransition(options: TransitionOptions = {}) {
  const duration = computed(() => {
    return getDuration(options.duration)
  })

  const enterFromClass = computed(() => {
    return options.enterFromClass || `${options.prefix}enter-from`
  })

  const enterActiveClass = computed(() => {
    return options.enterActiveClass || `${options.prefix}enter-active`
  })

  const enterToClass = computed(() => {
    return options.enterToClass || `${options.prefix}enter-to`
  })

  const leaveFromClass = computed(() => {
    return options.leaveFromClass || `${options.prefix}leave-from`
  })

  const leaveActiveClass = computed(() => {
    return options.leaveActiveClass || `${options.prefix}leave-active`
  })

  const leaveToClass = computed(() => {
    return options.leaveToClass || `${options.prefix}leave-to`
  })

  const realVisible = ref(false)
  const transitionClass = ref('')
  let status: 'entering' | 'entered' | 'leaving' | 'leaved' | '' = ''
  let timer: ReturnType<typeof setTimeout> | null
  let tickTimer: ReturnType<typeof setTimeout> | null

  function nextTick(callback: () => void) {
    tickTimer = setTimeout(() => {
      tickTimer = null
      callback()
    }, tickInterval)
  }

  function clearAllTimeout() {
    if (tickTimer) {
      clearTimeout(tickTimer)
      tickTimer = null
    }

    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function callHook(name: TransitionHookName) {
    options.onVisibleHook?.(name)
  }

  function enter() {
    clearAllTimeout()

    if (status === 'leaving') {
      callHook('leave-cancelled')
    }
    status = 'entering'

    realVisible.value = true
    transitionClass.value = `${enterFromClass.value} ${enterActiveClass.value}`
    callHook('before-enter')
    nextTick(() => {
      transitionClass.value = `${enterActiveClass.value} ${enterToClass.value}`
      callHook('enter')
    })

    timer = setTimeout(() => {
      timer = null
      if (status === 'entering' && options.visible) {
        entered()
      }
    }, duration.value.enter + tickInterval + 100)
  }

  function entered() {
    clearAllTimeout()

    status = 'entered'
    transitionClass.value = ''
    callHook('after-enter')
  }

  function leave() {
    clearAllTimeout()

    if (status === 'entering') {
      callHook('enter-cancelled')
    }
    status = 'leaving'

    transitionClass.value = `${leaveFromClass.value} ${leaveActiveClass.value}`
    callHook('before-leave')
    nextTick(() => {
      transitionClass.value = `${leaveActiveClass.value} ${leaveToClass.value}`
      callHook('leave')
    })

    timer = setTimeout(() => {
      timer = null
      if (status === 'leaving' && !options.visible) {
        leaved()
      }
    }, duration.value.leave + tickInterval + 100)
  }

  function leaved() {
    clearAllTimeout()

    status = 'leaved'
    transitionClass.value = ''
    realVisible.value = false
    callHook('after-leave')
  }

  function onTransitionEnd() {
    if (status === 'entering' && options.visible) {
      entered()
    } else if (status === 'leaving' && !options.visible) {
      leaved()
    }
  }

  onMounted(() => {
    if (options.visible) {
      enter()
    }
  })

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (tickTimer) {
      clearTimeout(tickTimer)
      tickTimer = null
    }
  })

  watch(
    () => options.visible,
    () => {
      if (options.visible) {
        enter()
      } else {
        leave()
      }
    },
  )

  return {
    onTransitionEnd,
    realVisible,
    transitionClass,
  }
}
