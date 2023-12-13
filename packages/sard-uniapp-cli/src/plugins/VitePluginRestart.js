import { resolve } from 'node:path'
import micromatch from 'micromatch'

export function VitePluginRestart(options) {
  let restartGlobs = []

  return {
    name: 'VitePluginRestart',
    enforce: 'pre',
    configResolved(config) {
      restartGlobs = options.restart.map((i) =>
        resolve(config.root || process.cwd(), i),
      )
    },
    configureServer(server) {
      server.watcher.add([...restartGlobs])
      server.watcher.on('add', handleFileChange)
      server.watcher.on('change', handleFileChange)
      server.watcher.on('unlink', handleFileChange)

      function handleFileChange(file) {
        if (micromatch.isMatch(file, restartGlobs)) {
          options.onRestart?.()
        }
      }
    },
  }
}
