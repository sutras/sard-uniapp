import pinyin from 'pinyin'
import toUrlHandle from './toUrlHandle.js'

const py = pinyin.default ?? pinyin

export default function genHash(code) {
  return code.replace(/<h([123])>(.*?)<\/h\1>/g, (_, g1, g2) => {
    const id = toUrlHandle(
      py(g2, {
        style: 'normal',
      }).toString(),
    )

    const anchor = `<a class="doc-anchor" href="#${id}">#</a>`

    return `<h${g1} id="${id}">${g2}${anchor}</h${g1}>`
  })
}
