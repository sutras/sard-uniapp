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
    external: ['react', 'react-dom'],
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  alias: null,
  site: {
    title: '',
    logo: '',
    seo: {
      title: '',
      description: '',
    },
    routes: [],
  },
}

export function mergeSardConfig(config) {
  return deepMerge({}, defaultSardConfig, config)
}
