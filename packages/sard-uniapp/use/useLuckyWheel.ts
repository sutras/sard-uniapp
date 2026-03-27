import { type Ref, computed, unref } from 'vue'
import { type UseLuckyDrawOptions, useLuckyDraw } from './useLuckyDraw'

export interface UseLuckyWheelOptions
  extends Omit<UseLuckyDrawOptions, 'count'> {
  count?: number | Ref<number>
}

const defaultOptions = {
  count: 8,
  minSpeed: 0.01,
  endDelay: 300,
}

export function useLuckyWheel(options?: UseLuckyWheelOptions) {
  const { count, ...restOptions } = Object.assign({}, defaultOptions, options)
  const { activeIndex, ...restResult } = useLuckyDraw({
    ...restOptions,
    count,
  })

  return {
    ...restResult,
    degrees: computed(() => {
      return unref(count) === 0
        ? 0
        : ((activeIndex.value || 0) / unref(count)) * 360
    }),
    sectorDegrees: computed(() => {
      return unref(count) === 0 ? 0 : 360 / unref(count)
    }),
  }
}

export type UseLuckyWheelReturn = ReturnType<typeof useLuckyWheel>
