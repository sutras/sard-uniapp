function splitWord(string: string) {
  return string
    .split(/[^a-zA-Z0-9$]+/)
    .map((item) => item.split(/([A-Z][^A-Z]*)/))
    .flat()
    .filter(Boolean)
}

/**
 * 将字符串首字母转换为小写格式。
 */
export function lowerFirst(string: string) {
  return string.replace(/^[A-Z]/, (m) => m.toLowerCase())
}

/**
 * 将字符串首字母转换为大写格式。
 */
export function upperFirst(string: string) {
  return string.replace(/^[a-z]/, (m) => m.toUpperCase())
}

/**
 * 将字符串转换为 PascalCase 格式（大驼峰）。
 */
export function pascalCase(string: string) {
  return splitWord(string)
    .map((word) => upperFirst(word.toLowerCase()))
    .join('')
}

/**
 * 将字符串转换为 camelCase 格式（小驼峰）。
 */
export function camelCase(string: string) {
  return lowerFirst(pascalCase(string))
}

/**
 * 将字符串转换为 Capitalize 格式（首字母大写，其余小写）。
 */
export function capitalize(string: string) {
  return upperFirst(string.toLowerCase())
}

/**
 * 将字符串转换为 kebab-case 格式（使用连字符拼接单词）。
 */
export function kebabCase(string: string) {
  return splitWord(string)
    .map((item) => item.toLowerCase())
    .join('-')
}

/**
 * 将字符串转换为 snake_case 格式（使用下划线拼接单词）。
 */
export function snakeCase(string: string) {
  return splitWord(string)
    .map((item) => item.toLowerCase())
    .join('_')
}
