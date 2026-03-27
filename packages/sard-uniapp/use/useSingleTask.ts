import { readonly, ref } from 'vue'

export function useSingleTask() {
  const isWorking = ref(false)

  let listeners: (() => any)[] = []

  async function startTask(task: () => any) {
    if (!isWorking.value) {
      isWorking.value = true
      await task()
      isWorking.value = false
      listeners.forEach((handler) => {
        handler()
      })
      listeners = []
    }
  }

  function onFinishTask(handler: () => any) {
    if (isWorking.value) {
      if (!listeners.includes(handler)) {
        listeners.push(handler)
      }
    } else {
      handler()
    }
  }

  function offFinishTask(handler: () => any) {
    if (isWorking.value) {
      const index = listeners.indexOf(handler)
      if (index !== -1) {
        listeners.splice(index, 1)
      }
    }
  }

  return {
    isWorking: readonly(isWorking),
    startTask,
    onFinishTask,
    offFinishTask,
  }
}
