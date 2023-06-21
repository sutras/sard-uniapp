function isPlainObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

export function deepMerge() {
  let target = arguments[0],
    i = 1,
    l = arguments.length,
    options,
    name,
    src,
    copy,
    copyIsArray,
    clone

  for (; i < l; i++) {
    options = arguments[i]
    if (options !== null && options !== undefined) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止有环
        if (target === copy) {
          continue
        }

        // 深复制
        if (isPlainObject(copy) || (copyIsArray = Array.isArray(copy))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          // 只克隆对象，不移动
          target[name] = deepMerge(clone, copy)
        }

        // 不添加未定义的值
        else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

export default deepMerge
