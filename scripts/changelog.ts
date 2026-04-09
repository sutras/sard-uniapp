import fsp from 'node:fs/promises'
import path from 'node:path'
import { changelogPath, libSrcDir } from './config'

async function changelog() {
  const { ConventionalChangelog } = await import('conventional-changelog')

  const generator = new ConventionalChangelog()
    .options({
      releaseCount: 0,
      reset: true,
    })
    .readPackage(path.resolve(libSrcDir, 'package.json'))
    .writer({
      transform(commit: any) {
        let { type } = commit

        if (commit.type === 'feat') {
          type = 'Features'
        } else if (commit.type === 'fix') {
          type = 'Bug Fixes'
        } else if (commit.type === 'perf') {
          type = 'Performance Improvements'
        } else if (commit.type === 'revert' || commit.revert) {
          type = 'Reverts'
        } else if (commit.type === 'refactor') {
          type = 'Code Refactoring'
        } else {
          return null
        }

        const shortHash = commit.hash ? commit.hash.slice(0, 7) : commit.hash

        return {
          ...commit,
          hash: shortHash,
          type,
          header: type + ': ' + commit.subject,
        }
      },
    })

  let chunks = ''
  for await (const chunk of generator.write()) {
    chunks += chunk
  }

  await fsp.writeFile(changelogPath, chunks)
}

changelog()
