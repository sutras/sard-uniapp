import { createServer } from 'vite'
import mergeViteConfig from '../utils/mergeViteConfig.js'
import { forkChildProcess } from './dev-uniapp.js'

export async function dev() {
  const uniProcess = forkChildProcess()

  uniProcess.on('message', async (data) => {
    if (data.url) {
      process.sard.url = data.url

      const server = await createServer(mergeViteConfig())
      await server.listen()
      server.printUrls()
    }
  })
}
