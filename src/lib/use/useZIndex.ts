import { ref } from 'vue'
import { defaultConfig } from '../components/config'

let currentZIndex = 0

export function useZIndex() {
  if (currentZIndex === 0) {
    currentZIndex = defaultConfig.initialZIndex
  }
  const zIndex = ref(currentZIndex)

  function increase() {
    zIndex.value = currentZIndex = currentZIndex + 1
  }

  return [zIndex, increase] as const
}
