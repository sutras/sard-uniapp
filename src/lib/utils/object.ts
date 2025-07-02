import { AnyObject } from './common'
import { isPlainObject } from './is'

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

/**
 * 深度克隆对象，仅克隆数组和无格式对象，其他类型会被直接返回
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
 * 深拷贝其他对象到第一个对象
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
