import { getDistanceBetweenTwoPoints } from '../utils'
import { useSetTimeout } from './useSetTimeout'

export function useSimulatedClick(click: () => void, duration = 10000) {
  let timeout = false
  let downCoord = { x: 0, y: 0 }

  const [timeoutLater, cancelTimeout] = useSetTimeout(() => {
    timeout = true
  })

  const onTouchStart = (event: TouchEvent) => {
    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    timeoutLater(duration)
  }

  const onTouchEnd = (event: TouchEvent) => {
    cancelTimeout()

    if (!timeout) {
      const upCoord = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      }

      const distance = getDistanceBetweenTwoPoints(downCoord, upCoord)
      if (distance <= 10) {
        click()
      }
    }

    timeout = false
  }

  return [onTouchStart, onTouchEnd] as const
}
