import consola from 'consola'
import { glob } from 'glob'
import fsp from 'node:fs/promises'
import path from 'node:path'

async function update() {
  const components: any[] = []

  function getGroup(title: string) {
    return components.find(
      (group) =>
        group.children!.findIndex((item) => {
          return item.title === title
        }) !== -1,
    )?.title
  }

  const files = await glob(
    path.resolve(process.cwd(), 'src/lib/components/**/*.md'),
  )

  for (const file of files) {
    const content = await fsp.readFile(file, { encoding: 'utf-8' })
    if (/^# /.test(content)) {
      const result = content.replace(
        /^# ([^ ]+?) ([^ ]+?)(?: <sup>(.*?)<\/sup>|)\n/,
        (...[, g1, g2, g3]) => {
          return `---
nav: 组件
title: ${g1}
subtitle: ${g2}
group: ${getGroup(`${g1} ${g2}`)}${g3 ? `\nversion: ${g3}` : ''}
---\n`
        },
      )
      await fsp.writeFile(file, result)
    }
  }
  consola.log('成功！！!')
}

update()
