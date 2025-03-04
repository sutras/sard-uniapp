/**
 * 此方法创建一个对象，该对象由自己不可省略的属性组成。
 */
export function omit<T extends object, U extends keyof T>(
  object: T,
  paths: U[],
) {
  const newObj = {} as Omit<T, U>
  Object.keys(object).forEach((key) => {
    if (!paths.includes(key as U)) {
      ;(newObj as any)[key] = object[key as U]
    }
  })
  return newObj
}
