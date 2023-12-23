export default function genHash(code) {
  const idMap = {}

  function checkExist(id) {
    if (idMap[id]) {
      id += '_1'
      return checkExist(id)
    } else {
      idMap[id] = true
      return id
    }
  }

  return code.replace(/<h([1234])>(.*?)<\/h\1>/g, (_, g1, g2) => {
    const id = checkExist(g2.replace(/[^\w\-\u4e00-\u9fa5]/g, ''))

    const anchor = `<a class="doc-anchor" href="#${id}">#</a>`

    return `<h${g1} id="${id}">${g2}${anchor}</h${g1}>`
  })
}
