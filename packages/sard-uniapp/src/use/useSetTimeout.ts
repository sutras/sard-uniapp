import { onUnmounted } from 'vue'

export function useSetTimeout(callback: (...args: any[]) => any) {
  let timer: ReturnType<typeof setTimeout> | null

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const doSomethingLater = (duration: number) => {
    cancel()
    timer = setTimeout(() => {
      timer = null
      callback()
    }, duration)
  }

  const isWaitingToDoSomething = () => {
    return !!timer
  }

  onUnmounted(() => {
    cancel()
  })

  return [doSomethingLater, cancel, isWaitingToDoSomething] as const
}
