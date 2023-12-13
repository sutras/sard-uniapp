import { code } from './code.js'
import { success, danger, warning, info } from './alert.js'

const rules = {
  code,
  success,
  danger,
  warning,
  info,
}

function precompile({ tagName, params, content, id }) {
  if (params) {
    params = new Function(`return [${params.replace(/(^\(|\)$)/g, '')}]`)()
  } else {
    params = []
  }

  return {
    tagName,
    params,
    content: content || '',
    id,
  }
}

export function compileAtRule(id, code) {
  const tagNames = Object.keys(rules).join('|')

  const regExp = new RegExp(
    `^@(${tagNames})(\\(.*\\))? *$\n(?:([\\s\\S]*?)(^@end\\1) *)?`,
    'mg',
  )

  const result = code
    .replace(/\f/g, '')
    .replace(regExp, (_m, tagName, params, content) => {
      const rule = rules[tagName]
      return rule(
        precompile({
          tagName,
          params,
          content,
          id,
        }),
      )
    })
  return result
}
