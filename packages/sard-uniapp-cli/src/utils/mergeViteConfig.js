import { relative, resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { transformIndexHtml } from '../plugins/transformIndexHtml.js'
import { loadSardConfig } from '../plugins/loadSardConfig.js'
import { transformRouter } from '../plugins/transformRouter.js'
import { transformMarkdown } from '../plugins/transformMarkdown.js'
import { loadStyles } from '../plugins/loadStyles.js'
import { transformDemo } from '../plugins/transformDemo.js'
import { transformMobileUrl } from '../plugins/transformMobileUrl.js'
import {
  CWD,
  SERVER_DEV_PORT,
  SERVER_PREVIEW_PORT,
  sardConfig,
  SITE_DIR,
  ROOT_DIR,
} from './constants.js'
import { deepMerge } from './deepMerge.js'

export function mergeViteConfig(options) {
  return deepMerge(
    {
      configFile: false,
      plugins: [
        transformIndexHtml(),
        loadSardConfig(),
        transformRouter(),
        transformMarkdown(),
        transformDemo(),
        transformMobileUrl(),
        loadStyles(),
        vue({
          include: [/.vue$/, /.md$/],
        }),
      ],
      root: SITE_DIR,
      base: sardConfig.base,
      publicDir: resolve(CWD, sardConfig.publicDir),
      server: {
        port: SERVER_DEV_PORT,
        host: true,
      },
      build: {
        outDir: relative(SITE_DIR, resolve(CWD, sardConfig.buildSite.outDir)),
        emptyOutDir: true,
      },
      preview: {
        port: SERVER_PREVIEW_PORT,
      },
      resolve: {
        alias: [
          ...sardConfig.alias,
          {
            find: '@@',
            replacement: ROOT_DIR,
          },
          {
            find: '@',
            replacement: CWD,
          },
        ],
      },
      css: {
        postcss: {
          plugins: [autoprefixer({})],
        },
      },
    },
    options,
  )
}

export default mergeViteConfig
