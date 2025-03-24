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

    startCallback?.(toTouchEvent(event))

    const moveHandler = (event: MouseEvent) => {
      event.preventDefault()
      moveCallback?.(toTouchEvent(event))
    }

    const upHandler = (event: MouseEvent) => {
      endCallback?.(toTouchEvent(event))
      document.removeEventListener('mousemove', moveHandler)
      document.removeEventListener('mouseup', upHandler)
    }

    document.addEventListener('mousemove', moveHandler)
    document.addEventListener('mouseup', upHandler)
    // #endif
  }
}
