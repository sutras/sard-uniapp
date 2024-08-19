import { toTouchEvent } from '../utils'

export function useMouseDown(
  startCallback?: (event: TouchEvent) => void,
  moveCallback?: (event: TouchEvent) => void,
  endCallback?: (event: TouchEvent) => void,
) {
  return (event: MouseEvent) => {
    // #ifdef WEB
    if ('ontouchstart' in document) {
      return
    }

    const info = uni.getSystemInfoSync()

    startCallback?.(toTouchEvent(event, info.windowTop))

    const moveHandler = (event: MouseEvent) => {
      event.preventDefault()
      moveCallback?.(toTouchEvent(event, info.windowTop))
    }

    const upHandler = (event: MouseEvent) => {
      endCallback?.(toTouchEvent(event, info.windowTop))
      document.removeEventListener('mousemove', moveHandler)
      document.removeEventListener('mouseup', upHandler)
    }

    document.addEventListener('mousemove', moveHandler)
    document.addEventListener('mouseup', upHandler)
    // #endif
  }
}
