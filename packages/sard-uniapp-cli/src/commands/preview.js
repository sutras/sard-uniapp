import { preview as vitePreview } from 'vite'
import mergeViteConfig from '../utils/mergeViteConfig.js'

export async function preview() {
  const server = await vitePreview(mergeViteConfig())

  server.printUrls()
}
