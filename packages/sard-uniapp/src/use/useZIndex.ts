import { ref } from 'vue'

let globalZIndex = 1000

export function useZIndex() {
  const zIndex = ref(globalZIndex)

  function increase() {
    zIndex.value = globalZIndex = globalZIndex + 1
  }

  return [zIndex, increase] as const
}
