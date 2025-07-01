// 每n位数字添加一个分隔符
export function addSeparator(num: number | string, separator = ',', digit = 3) {
  return String(num).replace(
    new RegExp(`\\B(?=(\\d{${digit}})+(?!\\d))`, 'g'),
    separator,
  )
}

/**
 * @description: 生成唯一ID，用于设置元素的ID，以便获取
 * @param {string} prefix
 * @return {string}
 */
export function uniqid(prefix = '__sar_'): string {
  return prefix + (~~(Math.random() * 10e8)).toString(36)
}

export type ClassProp =
  | string
  | number
  | null
  | undefined
  | Record<string, any>
  | ClassProp[]

// 把各种类型的参数拼接成字符串类名，以便小程序不支持classObject的问题
export function classNames(...args: ClassProp[]) {
  let result = ''

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) continue

    if (typeof arg === 'string' || typeof arg === 'number') {
      result += arg + ' '
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const className = classNames(...arg)
        if (className) {
          result += className + ' '
        }
      }
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        const value = arg[key]
        if (value) {
          result += key + ' '
        }
      }
    }
  }

  return result
}

export type StyleProp =
  | string
  | Record<any, any>
  | null
  | undefined
  | false
  | StyleProp[]

function toKebabCase(str: string) {
  return str
    .replace(/^[A-Z]/, (m) => m.toLowerCase())
    .replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}

// 把对象拼接成字符串，解决小程序不支持styleObject的问题
export function stringifyStyle(...args: StyleProp[]): string {
  let result = ''

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) continue

    if (typeof arg === 'string') {
      result += arg + ';'
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const string = stringifyStyle(...arg)
        if (string) {
          result += string + ';'
        }
      }
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        const value = arg[key]
        if (value || value === 0) {
          result += `${toKebabCase(key)}:${value};`
        }
      }
    }
  }

  return result
}
