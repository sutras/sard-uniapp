import { build } from 'vite'
import mergeViteConfig from '../utils/mergeViteConfig.js'
import './build-site-uniapp.js'

export async function buildSite() {
  await build(mergeViteConfig())
}
