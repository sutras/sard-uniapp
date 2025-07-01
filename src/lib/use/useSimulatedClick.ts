import { getTwoPointsDistance } from '../utils'
import { useTimeout } from './useTimeout'

export function useSimulatedClick(click: () => void, duration = 10000) {
  let timeout = false
  let downCoord = { x: 0, y: 0 }

  const { start: timeoutLater, stop: cancelTimeout } = useTimeout(() => {
    timeout = true
  }, duration)

  const onTouchStart = (event: TouchEvent) => {
    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    timeoutLater()
  }

  const onTouchEnd = (event: TouchEvent) => {
    cancelTimeout()

    if (!timeout) {
      const upCoord = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      }

      const distance = getTwoPointsDistance(downCoord, upCoord)
      if (distance <= 10) {
        click()
      }
    }

    timeout = false
  }

  return [onTouchStart, onTouchEnd] as const
}
