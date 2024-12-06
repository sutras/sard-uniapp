import { getDistanceBetweenTwoPoints } from '../utils'
import { useSetTimeout } from './useSetTimeout'

export interface UseSimulatedPressOptions {
  start?: () => void
  move?: (
    event: TouchEvent,
    extra: {
      delta: {
        x: number
        y: number
      }
    },
  ) => void
  end?: () => void
  duration?: number
}

export function useSimulatedPress(options: UseSimulatedPressOptions = {}) {
  const { start, move, end, duration = 500 } = options

  let downCoord = { x: 0, y: 0 }
  let isPressing = false

  const [triggerPressLater, cancelTriggerPress, isWaitingToTriggerPress] =
    useSetTimeout(() => {
      isPressing = true
      start?.()
    })

  const onTouchStart = (event: TouchEvent) => {
    downCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    triggerPressLater(duration)
  }

  const onTouchMove = (event: TouchEvent) => {
    const moveCoord = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
    if (isPressing) {
      move?.(event, {
        delta: {
          x: moveCoord.x - downCoord.x,
          y: moveCoord.y - downCoord.y,
        },
      })
    } else if (isWaitingToTriggerPress()) {
      const distance = getDistanceBetweenTwoPoints(downCoord, moveCoord)
      if (distance > 10) {
        cancelTriggerPress()
      }
    }
  }

  const onTouchEnd = () => {
    cancelTriggerPress()

    if (isPressing) {
      isPressing = false
      end?.()
    }
  }

  return [onTouchStart, onTouchMove, onTouchEnd] as const
}
