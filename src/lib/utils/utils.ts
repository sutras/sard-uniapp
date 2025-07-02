import { isPlainObject, isPrimitive } from './is'

/**
 * @description: 判断一个对象是否为看得到的空
 * @param {any} target
 * @return {boolean}
 */
export function isVisibleEmpty(target: any): boolean {
  return (
    target === null ||
    target === undefined ||
    (typeof target === 'string' && target.trim() === '')
  )
}

/**
 * @description: 判断一个值是否为空
 * @param {any} value
 * @return {boolean}
 */
export function isEmptyValue(value: any, whitespace = true) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (typeof value === 'string' && !whitespace && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0)
  )
}
/**
 * @description: 判断一个值渲染到DOM中时是否可见
 * @param {any} value
 * @return {boolean}
 */
export function isRenderVisible(value: any) {
  return (
    value !== null &&
    value !== undefined &&
    (typeof value !== 'string' || value.trim() !== '')
  )
}

/**
 * @description: 判断是否绑定为空值
 * @param {any} target
 * @return {boolean}
 */
export function isEmptyBinding(target: any): target is '' | null | undefined {
  return target === null || target === undefined || target === ''
}

export interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export function debounce(
  func: (...args: any[]) => any,
  wait: any,
  options: DebounceOptions = {},
) {
  let lastArgs: any[] | undefined,
    lastThis: any | undefined,
    maxWait: number | undefined,
    result: any,
    timerId: number | undefined,
    lastCallTime: number | undefined

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait && wait !== 0 && typeof requestAnimationFrame === 'function'

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isPlainObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing
      ? Math.max(+(options.maxWait as number) || 0, wait)
      : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args || [])
    return result
  }

  function startTimer(pendingFunc: FrameRequestCallback, wait: any) {
    if (useRAF) {
      cancelAnimationFrame(timerId as number)
      return requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id: number) {
    if (useRAF) {
      return cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait as number))
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(this: any, ...args: any[]) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

export function throttle(
  func: (...args: any[]) => any,
  wait: any,
  options: DebounceOptions = {},
) {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isPlainObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  })
}

/**
 * @description: 获取页面范围
 * @param {number} current 当前页码
 * @param {number} pageCount 总页数
 * @param {number} pageItemCount 要展示的页数
 * @return {[number, number]}
 */
export function getPageRange(
  current: number,
  pageCount: number,
  pageItemCount: number,
): number[] {
  let min = current - Math.ceil((pageItemCount - 1) / 2)
  let max = current + Math.floor((pageItemCount - 1) / 2)
  const minLack = 1 - min
  const maxLack = max - pageCount
  if (maxLack > 0) {
    min -= maxLack
  }
  if (min < 1) {
    min = 1
  }
  if (minLack > 0) {
    max += minLack
  }
  if (max > pageCount) {
    max = pageCount
  }

  return [min, max]
}

/**
 * @description: 将一个可选单位的字符串或数值拆分为数值和单位组成的数组
 * @param {number | string} target
 * @return {[number, string]}
 */
export function splitUnit(target: number | string) {
  const result = /([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z]+|%|)$/i.exec(
    String(target),
  ) || [0, '']

  return [+result[1], result[2]] as [number, string]
}

export const noop = () => {}

export function getMayPrimitiveOption(
  option:
    | string
    | number
    | boolean
    | {
        [key: PropertyKey]: any
      },
  key: string,
) {
  return isPrimitive(option) ? option : option[key]
}

export async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
