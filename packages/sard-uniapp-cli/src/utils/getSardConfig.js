import path from 'node:path'
import { deepMerge } from './deepMerge.js'

const defaultSardConfig = {
  name: '',
  styles: [],
  base: '/',
  publicDir: 'public',
  buildSite: {
    outDir: 'docs',
  },
  build: {
    entry: 'src/index',
    cssEntry: 'src/style',
    name: 'MyLib',
    fileName: 'my-lib',
    outDir: 'dist',
    srcDir: 'src',
    external: ['vue'],
    globals: {
      vue: 'vue',
    },
  },
  alias: null,
  site: {
    title: '',
    logo: '',
    tags: [],
    routes: [],
    seo: {
      title: '',
      description: '',
    },
  },
}

const { default: customConfig } = await import(
  path.resolve(process.cwd(), './sard.config.mjs')
)

export function getSardConfig() {
  return deepMerge({}, defaultSardConfig, customConfig)
}
