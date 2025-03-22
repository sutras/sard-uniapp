import { ticker } from './lwa.slim'

const friction = 0.95 // 摩擦系数
const minVelocity = 0.1 // 最小速度

export interface InertialAnimateOptions {
  update?: (value: number) => void
  complete?: () => void
}

export function createInertialAnimate(
  v: number,
  options: InertialAnimateOptions,
) {
  const initialVelocity = Math.abs(v)
  let isAnimating = false
  const reversed = v < 0

  const { update, complete } = options

  let velocity = initialVelocity

  function animate() {
    if (!isAnimating) return

    velocity *= friction

    let displacement = velocity * 15

    displacement *= reversed ? -1 : 1

    update?.(displacement)

    if (velocity < minVelocity) {
      isAnimating = false
      ticker.remove(animate)
      complete?.()
    }
  }

  function play() {
    if (!isAnimating) {
      isAnimating = true
      ticker.add(animate)
    }
  }

  function stop() {
    if (isAnimating) {
      isAnimating = false
      ticker.remove(animate)
    }
  }

  return {
    stop,
    play,
    isAnimating() {
      return isAnimating
    },
  }
}

export type InertialAnimate = ReturnType<typeof createInertialAnimate>
