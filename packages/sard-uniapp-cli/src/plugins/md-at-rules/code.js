import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { ROOT_DIR } from '../../utils/constants.js'

const defaultPaths = {
  DEMO_PATH: path.resolve(
    ROOT_DIR,
    '../sard-uniapp-demo/src/pages/components/',
  ),
}

function makeTextToCode(text, lang) {
  return text
    .replace(/^\s*|\s*$/g, '')
    .replace(/^/, `\`\`\`${lang}\n`)
    .replace(/$/, '\n```')
}

function extractHashContent(text, hash) {
  const regexp = new RegExp(
    `(?<=^\\s*//\\s*#${hash}\\s*\n)[\\s\\S]*?(?=^\\s*//\\s*#end${hash}\\s*)`,
    'm',
  )
  return regexp.exec(text)?.[0] || ''
}

function replaceDefaultPath(string) {
  const regexp = new RegExp(`\\$\\{(${Object.keys(defaultPaths).join('|')})\\}`)

  return String(string).replace(regexp, (m, p1) => {
    return defaultPaths[p1]
  })
}

function readSpecialFile(id, relativePath, hash) {
  relativePath = replaceDefaultPath(relativePath)

  const file = path.resolve(path.dirname(id), relativePath)

  if (existsSync(file)) {
    let text = readFileSync(file, 'utf-8')
    if (hash) {
      text = extractHashContent(text, hash)
    }
    const extname = path.extname(file).replace(/^\./, '')
    return makeTextToCode(text, extname === 'vue' ? 'html' : extname)
  } else {
    return ''
  }
}

function replaceSpecialFile(id, url) {
  const [path, hash] = url.split('#')
  return readSpecialFile(id, path, hash)
}

export function code(meta) {
  return replaceSpecialFile(meta.id, meta.params[0])
}

code.tagName = 'code'
