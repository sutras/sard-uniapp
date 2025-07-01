import { minmax } from './number'

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
): number {
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
): number {
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
): number {
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
