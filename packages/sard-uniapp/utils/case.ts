// 把字符串转换为 keybab-case
export function kebabCase(str: string) {
  return str.replace(/[A-Z]/g, (m) => {
    return '-' + m.toLowerCase()
  })
}
