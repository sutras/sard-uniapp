import { createServer } from 'vite'
import mergeViteConfig from '../utils/mergeViteConfig.js'
import './dev-uniapp.js'

export async function dev() {
  const server = await createServer(mergeViteConfig())
  await server.listen()
  server.printUrls()
}
