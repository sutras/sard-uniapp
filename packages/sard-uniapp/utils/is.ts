/**
 * @description: 判断是否为纯对象
 * @param {any} target
 * @return {boolean}
 */
export function isPlainObject(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

/**
 * @description: 判断是否为函数
 * @param {any} target
 * @return {boolean}
 */
export function isFunction(target: any) {
  return typeof target === 'function'
}

/**
 * @description: 判断是否为字符串
 * @param {any} target
 * @return {boolean}
 */
export function isString(target: any) {
  return typeof target === 'string'
}

/**
 * @description: 判断是否为数值
 * @param {any} target
 * @return {boolean}
 */
export function isNumber(target: any) {
  return typeof target === 'number'
}
