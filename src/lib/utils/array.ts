/**
 * @description: 确保目标是一个数组
 * @param {any} target
 * @return {array}
 */
export function toArray<T>(target: T | T[]): T[] {
  return Array.isArray(target) ? target : [target]
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
): number {
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
 * 判断两数组是否相等，浅比较，元素个数和位置都要相等才为真。
 */
export function arrayEqual(arr1: any[], arr2: any[]): boolean {
  return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i])
}

/**
 * 打乱并返回数组，会修改原数组。
 */
export function shuffle<T>(array: T[]): T[] {
  const len = array.length
  for (let i = len - 1; i >= 0; i--) {
    const randomIndex = ~~(Math.random() * (i + 1))
    const temp = array[randomIndex]
    array[randomIndex] = array[i]
    array[i] = temp
  }
  return array
}

/**
 * 移动数组中的元素，会返回移动后的新数组。
 */
export function arrayMove<T>(array: T[], fromIndex: number, toIndex: number) {
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
      ...array.slice(0, toIndex),
      fromValue,
      ...array.slice(toIndex, fromIndex),
      ...array.slice(fromIndex + 1),
    ]
  } else {
    return [
      ...array.slice(0, fromIndex),
      ...array.slice(fromIndex + 1, toIndex + 1),
      fromValue,
      ...array.slice(toIndex + 1),
    ]
  }
}
