/**
 * 限定数值范围
 */
export function clamp(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n
}

/**
 * 把一个数四舍五入到指定位数小数。
 */
export function round(n: number, precision = 0): number {
  return Math.round(+(n + 'e' + precision)) / 10 ** precision
}

/**
 * 获取小数位数
 */
export function getDecimalsLength(n: number | string): number {
  n = n.toString().split('.')[1]
  return n ? n.length : 0
}

/**
 * 把一个数舍入到指定数的倍数
 */
export function mround(n: number, m: number): number {
  return round(n - (n % m) + Math.round((n % m) / m) * m, getDecimalsLength(m))
}

/**
 * 生成两数间的一个随机整数
 */
export function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * 判断一个数是否在指定范围内。
 */
export function inRange(n: number, min: number, max: number) {
  return n > min && n < max
}
