import { getWindowInfo, toTouchEvent } from '../utils'

export function useMouseDown(
  startCallback?: (event: TouchEvent) => void,
  moveCallback?: (event: TouchEvent) => void,
  endCallback?: (event: TouchEvent) => void,
) {
  return (event: MouseEvent) => {
    console.log('onMouseDown', event)
    // #ifdef WEB
    if ('ontouchstart' in document) {
      return
    }

    const { windowTop } = getWindowInfo()

    startCallback?.(toTouchEvent(event, windowTop))

    const moveHandler = (event: MouseEvent) => {
      event.preventDefault()
      moveCallback?.(toTouchEvent(event, windowTop))
    }

    const upHandler = (event: MouseEvent) => {
      endCallback?.(toTouchEvent(event, windowTop))
      document.removeEventListener('mousemove', moveHandler)
      document.removeEventListener('mouseup', upHandler)
    }

    document.addEventListener('mousemove', moveHandler)
    document.addEventListener('mouseup', upHandler)
    // #endif
  }
}
