/**
 * @description: 判断是否为纯对象
 * @param {any} target
 * @return {boolean}
 */
export function isPlainObject(target: any): target is Record<PropertyKey, any> {
  return Object.prototype.toString.call(target) === '[object Object]'
}

/**
 * @description: 判断是否为函数
 * @param {any} target
 * @return {boolean}
 */
export function isFunction(target: any): target is (...args: any[]) => any {
  return typeof target === 'function'
}

/**
 * @description: 判断是否为字符串
 * @param {any} target
 * @return {boolean}
 */
export function isString(target: any): target is string {
  return typeof target === 'string'
}

/**
 * @description: 判断是否为数值
 * @param {any} target
 * @return {boolean}
 */
export function isNumber(target: any): target is number {
  return typeof target === 'number'
}

/**
 * @description: 判断是否为布尔值
 * @param {any} target
 * @return {boolean}
 */
export function isBoolean(target: any): target is boolean {
  return typeof target === 'boolean'
}

/**
 * @description: 判断是否为undefined
 * @param {any} target
 * @return {boolean}
 */
export function isUndefined(target: any): target is undefined {
  return target === undefined
}

/**
 * @description: 判断是否为null或者undefined
 * @param {any} target
 * @return {boolean}
 */
export function isNullish(target: any): target is null | undefined {
  return target === null || target === undefined
}

/**
 * @description: 判断是否为原始类型
 * @param {any} target
 * @return {boolean}
 */
export function isPrimitive(target: any): target is string | number | boolean {
  return isString(target) || isNumber(target) || isBoolean(target)
}
