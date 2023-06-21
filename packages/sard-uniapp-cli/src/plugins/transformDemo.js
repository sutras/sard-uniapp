import MarkdownIt from 'markdown-it'
import { DEMO_DIR } from '../utils/constants.js'
import { highlight, hlCallback } from '../utils/highlight.js'

const rDemoDoc = /^\s*\/\*([\s\S]*?)\*\//

function stripDemoDoc(src) {
  return src.replace(rDemoDoc, '').replace(/^\s*|\s*$/g, '')
}

function transform(code, id, md) {
  if (!new RegExp(`/${DEMO_DIR}/`).test(id)) {
    return
  }

  const docCode = rDemoDoc.exec(code)?.[1].trim() || ''

  const compCode = stripDemoDoc(code)

  const docObj = {
    doc: md.render(docCode),
    code: highlight(compCode, 'jsx'),
  }

  return `${compCode}\n\nexport const doc = ${JSON.stringify(docObj)}`
}

export function transformDemo() {
  const md = new MarkdownIt({
    html: true,
    highlight: hlCallback,
  })

  return {
    name: 'transformDemo',
    enforce: 'pre',
    transform(code, id) {
      return transform(code, id, md)
    },
  }
}
