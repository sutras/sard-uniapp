import { onBeforeUnmount, onMounted } from 'vue'

export function useWindowResize(
  callback: (size: { windowWidth: number; windowHeight: number }) => void,
) {
  const cb = (res: any) => {
    callback({
      windowWidth: res.size.windowWidth,
      windowHeight: res.size.windowHeight,
    })
  }

  onMounted(() => {
    uni.onWindowResize?.(cb)
  })

  onBeforeUnmount(() => {
    uni.offWindowResize?.(cb)
  })
}
