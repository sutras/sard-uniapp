import { kebabCase } from './case'
import { isPlainObject, isPrimitive } from './is'

/**
 * @description: 确保目标是一个数组
 * @param {any} target
 * @return {array}
 */
export function toArray(target: any) {
  return Array.isArray(target) ? target : [target]
}

/**
 * @description: 限定数值范围
 * @param {number} n 被限定的值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 限定后的值
 */
export function minmax(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n
}

/**
 * @description: 获取小数位数
 * @param {number | string} n 要操作的数值
 * @return {number}
 */
export function getDecimalsLength(n: number | string) {
  n = n.toString().split('.')[1]
  return n ? n.length : 0
}

/**
 * @description: 把一个数四舍五入到指定位数小数
 * @param {number} n 要操作的数值
 * @param {number} precision 精准度，即小数个数
 * @return {number}
 */
export function round(n: number, precision = 0) {
  return Math.round(+(n + 'e' + precision)) / 10 ** precision
}

/**
 * @description: 把一个数舍入到指定数的倍数
 * @param {number} n 要舍入的数值
 * @param {number} m 结果值的因数
 * @return {number}
 */
export function mround(n: number, m: number) {
  return round(n - (n % m) + Math.round((n % m) / m) * m, getDecimalsLength(m))
}

/**
 * @description: 生成唯一ID，用于设置元素的ID，以便获取
 * @param {string} prefix
 * @return {string}
 */
export function uniqid(prefix = '__sar_') {
  return prefix + (~~(Math.random() * 10e8)).toString(36)
}

/**
 * @description: 获取阻尼值
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {number} damping
 * @return {number}
 */
export function getDampingValue(
  value: number,
  min: number,
  max: number,
  damping: number,
) {
  if (value < min) {
    return min + (value - min) * damping
  }
  if (value > max) {
    return max + (value - max) * damping
  }
  return value
}

/**
 * @description: 获取矩形阻尼值
 * @param {number} offset 当前的偏移量
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @param {number} damping 阻尼系数
 * @return {number}
 */
export function getRectDampingValue(
  offset: number,
  areaSize: number,
  viewSize: number,
  damping: number,
) {
  const diff = areaSize - viewSize
  let min, max
  if (diff < 0) {
    min = diff
    max = 0
  } else {
    min = 0
    max = diff
  }
  return getDampingValue(offset, min, max, damping)
}
/**
 * @description: 获取范围值
 * @param {number} offset 当前的偏移量
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @return {number}
 */
export function getInBoundValue(
  offset: number,
  areaSize: number,
  viewSize: number,
) {
  const diff = areaSize - viewSize
  const [min, max] = [0, diff].sort((a, b) => a - b)
  return minmax(offset, min, max)
}

/**
 * @description: 获取溢出值范围
 * @param {number} overflow 最大溢出值
 * @param {number} areaSize 范围值
 * @param {number} viewSize 范围内某个视图尺寸值
 * @return {*}
 */
export function getOverflowRangeInArea(
  overflow: number,
  areaSize: number,
  viewSize: number,
): [number, number] {
  if (areaSize > viewSize) {
    return [-overflow, areaSize + overflow]
  } else {
    return [areaSize - viewSize - overflow, overflow]
  }
}

/**
 * @description: 扩散性遍历
 * @param {any[]} array 要遍历的数组
 * @param {(el: any, spreadIndex: number, index: number) => any} callback 回调函数，接收当前元素、扩散性下标、迭代下标作为参数，
 *  如果返回true，则中止遍历
 * @param {number} currIndex 遍历开始的下标
 * @param {number} direction 开始遍历的方向
 * @return {number} 扩散性下标、或开始下标
 */
export function spreadEach(
  array: any[],
  callback: (el: any, spreadIndex: number, index: number) => any,
  startIndex = 0,
  direction = -1,
) {
  const len = array.length
  let spreadIndex = startIndex
  let edge = 0
  direction = -direction
  for (let i = 0; i < len; i++) {
    if (edge < 0) {
      spreadIndex = len - 1 - i
    } else if (edge > 0) {
      spreadIndex = i
    } else {
      spreadIndex = spreadIndex + direction * i
      edge = spreadIndex === 0 ? 1 : spreadIndex === len - 1 ? -1 : 0
      direction = -direction
    }

    if (typeof callback === 'function') {
      if (callback(array[spreadIndex], spreadIndex, i)) {
        return spreadIndex
      }
    }
  }
  return startIndex
}

/**
 * @description: 深度克隆对象，仅克隆数组和无格式对象，其他类型会被直接返回
 * @param {any} target
 * @return {any}
 */
export function deepClone(target: any): any {
  if (Array.isArray(target)) {
    return target.map((item) => {
      return deepClone(item)
    })
  }
  if (isPlainObject(target)) {
    const obj: Record<string, any> = {}
    Object.keys(target).forEach((k) => {
      obj[k] = deepClone(target[k])
    })
    return obj
  }
  return target
}

/**
 * @description: 深拷贝其他对象到第一个对象
 * @param args 任意长度参数对象
 * @return 返回第一个参数对象
 */
export function extend(...args: any[]) {
  const target = args[0],
    l = args.length

  let i = 1,
    options,
    name,
    src,
    copy,
    copyIsArray,
    clone

  for (; i < l; i++) {
    options = args[i]
    if (options !== null && options !== undefined) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止有环
        if (target === copy) {
          continue
        }

        // 深复制
        if (
          copy &&
          (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = isPlainObject(src) ? src : {}
          }

          // 只克隆对象，不移动
          target[name] = extend(clone, copy)

          // 不添加未定义的值
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

/**
 * @description: 判断两数组是否相等，浅比较
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @return {boolean}
 */
export function arrayEqual(arr1: any[], arr2: any[]) {
  return arr1.length === arr1.length && arr1.every((el, i) => el === arr2[i])
}

/**
 * @description: 判断一个对象是否为看得到的空
 * @param {any} target
 * @return {boolean}
 */
export function isVisibleEmpty(target: any) {
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
) {
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

interface AnyObject {
  [p: string]: any
}

export function treeToMap(
  tree: AnyObject[],
  keyName: string,
  childrenName: string,
  parentName: string,
) {
  const map: {
    [p: string]: AnyObject
  } = {}

  function recurse(children: AnyObject[], parent: AnyObject | null) {
    children.forEach((node) => {
      map[node[keyName]] = node
      node[parentName] = parent
      if (Array.isArray(node[childrenName])) {
        recurse(node[childrenName], node)
      }
    })
  }
  recurse(tree, null)
  return map
}

/**
 * @description: 打乱数组
 * @param {any[]} arr 要打乱的数组
 * @param {boolean} inPlace 是否改变原数组
 * @return {any[]}
 */
export function shuffle(arr: any[], inPlace = false) {
  if (!inPlace) {
    arr = arr.slice()
  }
  const len = arr.length
  for (let i = len - 1; i >= 0; i--) {
    const randomIndex = ~~(Math.random() * (i + 1))
    const temp = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = temp
  }
  return arr
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}
/**
 * @description: 根据原始坐标尺寸和缩放后的坐标尺寸算出转换的原点
 * @param {Rect} rect
 * @param {Rect} scaleRect
 * @return {[number, number]}
 */
export function getTransformOrigin(rect: Rect, scaleRect: Rect) {
  const ratio = scaleRect.width / rect.width
  const originX =
    (rect.x + rect.width / 2 - scaleRect.x - scaleRect.width / 2) /
      (ratio - 1) +
    rect.width / 2
  const originY =
    (rect.y + rect.height / 2 - scaleRect.y - scaleRect.height / 2) /
      (ratio - 1) +
    rect.height / 2
  return [originX, originY]
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

/**
 * @description: 链式获取对象值
 * @param object
 * @param chain 通过点分割的字符串或者字符串数组
 */
export function chainGet(object: any, chain?: string | string[]) {
  let target = object

  if (chain) {
    chain = typeof chain === 'string' ? chain.split('.') : chain

    for (const key of chain) {
      if (target && typeof target === 'object') {
        target = target[key]
      } else {
        return target
      }
    }
  }

  return target
}

/**
 * @description: 链式设置对象值
 * @param object
 * @param chain 通过点分割的字符串或者字符串数组
 * @param value 要设置的值
 */
export function chainSet(object: any, chain: string | string[], value: any) {
  let target = object

  chain = typeof chain === 'string' ? chain.split('.') : chain

  if (chain.length === 0) {
    return
  }

  for (let i = 0, l = chain.length; i < l; i++) {
    if (target && typeof target === 'object') {
      const key = chain[i]
      if (i === l - 1) {
        target[key] = value
        return
      } else {
        target = target[key]
      }
    } else {
      return
    }
  }
}

/**
 * @description: 移动数组中的元素
 * @param array
 * @param fromIndex
 * @param toIndex
 * @return 移动后的新数组
 */
export function arrayMove(array: any[], fromIndex: number, toIndex: number) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length
  ) {
    return array
  }

  const fromValue = array[fromIndex]

  if (fromIndex > toIndex) {
    return [
      ...array.slice(0, fromIndex),
      ...array.slice(fromIndex + 1, toIndex + 1),
      fromValue,
      ...array.slice(toIndex + 1),
    ]
  } else {
    return [
      ...array.slice(0, toIndex),
      fromValue,
      ...array.slice(toIndex, fromIndex),
      ...array.slice(fromIndex + 1),
    ]
  }
}

export type StyleProp =
  | string
  | Record<any, any>
  | null
  | undefined
  | false
  | StyleProp[]

// 把对象拼接成字符串，解决小程序不支持styleObject的问题
export function stringifyStyle(...args: StyleProp[]): string {
  let result = ''

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) continue

    if (typeof arg === 'string') {
      result += arg + ';'
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const string = stringifyStyle(...arg)
        if (string) {
          result += string + ';'
        }
      }
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        const value = arg[key]
        if (value || value === 0) {
          result += `${kebabCase(key)}:${value};`
        }
      }
    }
  }

  return result
}

export type ClassProp =
  | string
  | number
  | null
  | undefined
  | Record<string, any>
  | ClassProp[]

// 把各种类型的参数拼接成字符串类名，以便小程序不支持classObject的问题
export function classNames(...args: ClassProp[]) {
  let result = ''

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) continue

    if (typeof arg === 'string' || typeof arg === 'number') {
      result += arg + ' '
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const className = classNames(...arg)
        if (className) {
          result += className + ' '
        }
      }
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        const value = arg[key]
        if (value) {
          result += key + ' '
        }
      }
    }
  }

  return result
}

export const noop = () => {}

// 将嵌套数据结构转换为多维数组
export function nestedToMulti(
  nested: any[],
  values: (number | string)[],
  fieldKeys: {
    value: string
    children: string
  },
) {
  const columns: any[] = []

  function recurse(list: any[], index = 0) {
    columns.push(list)
    const selectedValue = values[index]
    let selectedOption = list.find(
      (option) => option[fieldKeys.value] === selectedValue,
    )
    if (!selectedOption) {
      selectedOption = list[0]
    }
    if (selectedOption) {
      const nextList = selectedOption[fieldKeys.children]
      if (Array.isArray(nextList)) {
        recurse(nextList, ++index)
      }
    }
  }

  recurse(nested)

  return columns
}

// 生成两数间的一个随机整数
export function random(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}

// 每n位数字添加一个分隔符
export function addSeparator(num: number | string, separator = ',', digit = 3) {
  return String(num).replace(
    new RegExp(`\\B(?=(\\d{${digit}})+(?!\\d))`, 'g'),
    separator,
  )
}

export interface Coord {
  x: number
  y: number
}

export function getDistanceBetweenTwoPoints(c1: Coord, c2: Coord) {
  return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2))
}

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
