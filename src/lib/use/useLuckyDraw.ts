import { type Ref, computed, onScopeDispose, ref, unref } from 'vue'
import { random, ticker } from '../utils'

export interface UseLuckyDrawOptions {
  count: number | Ref<number>
  minSpeed?: number | Ref<number>
  maxSpeed?: number | Ref<number>
  accelTime?: number | Ref<number>
  decelTime?: number | Ref<number>
  easeIn?: (progress: number) => number
  easeOut?: (progress: number) => number
  startDelay?: number | Ref<number>
  endDelay?: number | Ref<number>
  complete?: (index: number) => void
}

const defaultOptions = {
  minSpeed: 0.1,
  maxSpeed: 0.4,
  accelTime: 2500,
  decelTime: 2500,
  easeIn: (k: number) => k * k,
  easeOut: (k: number) => k * (2 - k),
  startDelay: 0,
  endDelay: 0,
}

export const useLuckyDraw = (options: UseLuckyDrawOptions) => {
  const {
    count,
    minSpeed,
    maxSpeed,
    accelTime,
    decelTime,
    complete,
    easeIn,
    easeOut,
    startDelay,
    endDelay,
  } = Object.assign({}, defaultOptions, options)

  let stage:
    | 'INITIAL'
    | 'START_DELAY'
    | 'ACCELERATED'
    | 'CONSTANT_SPEED'
    | 'DECELERATED'
    | 'END_DELAY'
    | 'DONE' = 'INITIAL'
  let currentIndex = 0
  const activeIndex = ref<number>()

  const playing = ref(false)
  let startTime = 0
  let accelFrames = 0
  let decelStopIndex: number | undefined
  let decelStopActiveIndex: number | undefined
  let decelStartIndex = 0

  const getDecelStopIndex = () => {
    const interval = unref(accelTime) / accelFrames
    let i = 0
    let mockCurrentIndex = currentIndex
    let mockActiveIndex = 0

    while (++i) {
      let progress = (interval * i) / unref(decelTime)
      if (progress >= 1) {
        progress = 1
      }
      const currentSpeed =
        unref(maxSpeed) -
        easeOut(progress) * (unref(maxSpeed) - unref(minSpeed))
      mockCurrentIndex += currentSpeed
      mockActiveIndex = mockCurrentIndex % unref(count) >> 0
      if (progress === 1 && mockActiveIndex === decelStopActiveIndex) {
        break
      }
    }
    return mockCurrentIndex >> 0
  }

  const tick = () => {
    switch (stage) {
      case 'START_DELAY': {
        if (Date.now() - startTime >= unref(startDelay)) {
          stage = 'ACCELERATED'
          startTime = Date.now()
        }
        break
      }
      case 'ACCELERATED': {
        accelFrames++
        let progress = (Date.now() - startTime) / unref(accelTime)
        if (progress >= 1) {
          progress = 1
        }
        const currentSpeed =
          unref(minSpeed) +
          easeIn(progress) * (unref(maxSpeed) - unref(minSpeed))
        currentIndex += currentSpeed

        if (progress === 1) {
          stage = 'CONSTANT_SPEED'
        }
        break
      }
      case 'CONSTANT_SPEED': {
        currentIndex += unref(maxSpeed)

        if (decelStopActiveIndex !== undefined) {
          stage = 'DECELERATED'
          startTime = Date.now()
        }
        break
      }
      case 'DECELERATED': {
        if (decelStopIndex === undefined) {
          decelStopIndex = getDecelStopIndex()
          decelStartIndex = currentIndex
        }

        let progress = (Date.now() - startTime) / unref(decelTime)
        if (progress >= 1) {
          progress = 1
        }
        currentIndex =
          decelStartIndex +
          easeOut(progress) * (decelStopIndex - decelStartIndex)

        if (progress === 1) {
          if (unref(endDelay) === 0) {
            stage = 'DONE'
          } else {
            stage = 'END_DELAY'
            startTime = Date.now()
          }
        }
        break
      }
      case 'END_DELAY': {
        if (Date.now() - startTime >= unref(endDelay)) {
          stage = 'DONE'
        }
        break
      }
      case 'DONE': {
        const index = decelStopActiveIndex as number
        pause()
        complete?.(index)
        break
      }
    }

    activeIndex.value = currentIndex
  }

  const play = () => {
    if (playing.value) {
      return
    }
    playing.value = true
    startTime = Date.now()
    if (unref(startDelay) === 0) {
      stage = 'ACCELERATED'
    } else {
      stage = 'START_DELAY'
    }

    ticker.add(tick)
  }

  const pause = () => {
    ticker.remove(tick)
    playing.value = false
    startTime = 0
    accelFrames = 0
    decelStopIndex = undefined
    decelStopActiveIndex = undefined
    decelStartIndex = 0
  }

  const reset = () => {
    pause()
    stage = 'INITIAL'
    currentIndex = 0
    activeIndex.value = undefined
  }

  const stop = (index?: number) => {
    if (decelStopActiveIndex === undefined) {
      decelStopActiveIndex =
        index === undefined ? random(0, unref(count) - 1) : index
    }
  }

  onScopeDispose(() => {
    pause()
  })

  return {
    play,
    stop,
    pause,
    reset,
    playing: computed(() => playing.value),
    activeIndex: computed(() => activeIndex.value),
  }
}

export type UseLuckyDrawReturn = ReturnType<typeof useLuckyDraw>
