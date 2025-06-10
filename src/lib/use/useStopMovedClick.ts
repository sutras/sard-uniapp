import { ref } from 'vue'

export function useStopMovedClick() {
  let isDown = false
  let moved = false

  const isStoppedClick = ref(false)

  const onMouseDown = () => {
    isDown = true
    moved = false
    isStoppedClick.value = false
  }

  const onMouseMove = () => {
    moved = true
  }

  const onMouseUp = () => {
    if (isDown && moved) {
      isStoppedClick.value = true
    }
    isDown = false
  }

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    isStoppedClick,
  }
}
