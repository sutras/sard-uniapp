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
 * @description: 把一个数四舍五入到指定位数小数
 * @param {number} n 要操作的数值
 * @param {number} precision 精准度，即小数个数
 * @return {number}
 */
export function round(n: number, precision = 0): number {
  return Math.round(+(n + 'e' + precision)) / 10 ** precision
}

/**
 * @description: 获取小数位数
 * @param {number | string} n 要操作的数值
 * @return {number}
 */
export function getDecimalsLength(n: number | string): number {
  n = n.toString().split('.')[1]
  return n ? n.length : 0
}

/**
 * @description: 把一个数舍入到指定数的倍数
 * @param {number} n 要舍入的数值
 * @param {number} m 结果值的因数
 * @return {number}
 */
export function mround(n: number, m: number): number {
  return round(n - (n % m) + Math.round((n % m) / m) * m, getDecimalsLength(m))
}

// 生成两数间的一个随机整数
export function random(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}
