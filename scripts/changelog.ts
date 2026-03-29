import fsp from 'node:fs/promises'
import path from 'node:path'
import { changelogPath, libSrcDir } from './config'

async function changelog() {
  const { ConventionalChangelog } = await import('conventional-changelog')

  const generator = new ConventionalChangelog()
    .options({
      releaseCount: 0,
    })
    .readPackage(path.resolve(libSrcDir, 'package.json'))

  let chunks = ''
  for await (const chunk of generator.write()) {
    chunks += chunk
  }

  await fsp.writeFile(changelogPath, chunks)
}

changelog()
