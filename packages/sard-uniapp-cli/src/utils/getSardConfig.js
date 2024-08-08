import path from 'node:path'
import fs from 'node:fs'
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

const customConfig = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), './sard.config.json'), 'utf8'),
)

export function getSardConfig() {
  return deepMerge({}, defaultSardConfig, customConfig)
}
