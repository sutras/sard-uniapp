import { onMounted, onUnmounted } from 'vue'

export function useResize(callback) {
  const handler = () => {
    callback?.()
  }

  onMounted(() => {
    window.addEventListener('resize', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handler)
  })
}
