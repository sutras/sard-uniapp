import { preview as vitePreview } from 'vite'
import { docsBase, docsOutDir } from './config'

async function preview() {
  const server = await vitePreview({
    configFile: false,
    base: docsBase,
    build: {
      outDir: docsOutDir,
    },
  })

  server.printUrls()
}

preview()
