/**
 * @description: 确保目标是一个数组
 * @param {any} target
 * @return {array}
 */
export function toArray(target: any): any[] {
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
 * @description: 判断两数组是否相等，浅比较
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @return {boolean}
 */
export function arrayEqual(arr1: any[], arr2: any[]): boolean {
  return arr1.length === arr1.length && arr1.every((el, i) => el === arr2[i])
}

/**
 * @description: 打乱数组
 * @param {any[]} arr 要打乱的数组
 * @param {boolean} inPlace 是否改变原数组
 * @return {any[]}
 */
export function shuffle(arr: any[], inPlace = false): any[] {
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
