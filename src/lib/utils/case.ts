// 把字符串转换为 CamelCase
export function toUpperCamelCase(str: string) {
  return str
    .replace(/^[a-z]/, (m) => m.toUpperCase())
    .replace(/[-_]([a-z])/g, (_, g1) => g1.toUpperCase())
}

// 把字符串转换为 camelCase
export function toLowerCamelCase(str: string) {
  return str
    .replace(/^[A-Z]/, (m) => m.toLowerCase())
    .replace(/[-_]([a-z])/g, (_, g1) => g1.toUpperCase())
}

// 把字符串转换为 kebab-case
export function toKebabCase(str: string) {
  return str
    .replace(/^[A-Z]/, (m) => m.toLowerCase())
    .replace(/_/g, '-')
    .replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}

// 把字符串转换为 snake_case
export function toSnakeCase(str: string) {
  return str
    .replace(/^[A-Z]/, (m) => m.toLowerCase())
    .replace(/-/g, '_')
    .replace(/[A-Z]/g, (m) => '_' + m.toLowerCase())
}
