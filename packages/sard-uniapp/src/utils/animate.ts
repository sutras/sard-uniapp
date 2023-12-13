import { minmax } from './index'

export function easeInQuad(k: number) {
  return k * k
}

export function easeOutQuad(k: number) {
  return k * (2 - k)
}

export function easeInOutQuad(k: number) {
  if ((k *= 2) < 1) return 0.5 * k * k
  return -0.5 * (--k * (k - 2) - 1)
}

export function easeOutSine(k: number) {
  return Math.sin((k * Math.PI) / 2)
}

export function easeOutCubic(k: number) {
  return --k * k * k + 1
}

export interface AnimateOptions {
  from: number
  to: number
  duration?: number
  step?: (value: number) => void
  finish?: (value: number) => void
  easing?: (k: number) => number
}

export interface AnimateStop {
  (): void
  finish(): void
}

export function animate({
  from = 0,
  to = 0,
  duration = 0,
  step = () => {
    null
  },
  finish,
  easing = easeOutQuad,
}: AnimateOptions): AnimateStop {
  const total = to - from
  const begin = Date.now()
  let progress = 0
  let over = false
  const stop = () => {
    over = true
  }
  stop.finish = () => {
    stop()
    step(to)
    finish?.(to)
  }
  const stepCallback = () => {
    if (over) {
      return
    }
    progress = minmax((Date.now() - begin) / duration, 0, 1)
    const value = easing(progress) * total + from
    step(value)
    if (progress === 1) {
      stop()
      return finish?.(value)
    }
    requestAnimationFrame(stepCallback)
  }

  if (duration === 0) {
    step(to)
    finish?.(to)
  } else {
    requestAnimationFrame(stepCallback)
  }

  return stop
}
