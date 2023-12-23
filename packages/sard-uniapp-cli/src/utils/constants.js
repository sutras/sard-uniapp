import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSardConfig } from './getSardConfig.js'

export const ROOT_DIR = resolve(
  fileURLToPath(dirname(import.meta.url)),
  '../../',
)

export const CWD = process.cwd()

// sard config
export const SARD_CONFIG_FILENAME = 'sard.config.mjs'
export const sardConfig = getSardConfig()
export const MAIN_FILE_NAME = 'main.ts'

// site
export const SITE_DIR = resolve(ROOT_DIR, './src/site')

export const SERVER_DEV_PORT = 7761
export const SERVER_PREVIEW_PORT = 7760

export const DEFAULT_README_NAME = 'README.md'

export const DEMO_DIR = 'demo'

export const MD_PATH_R = /\.md$/
export const CUSTOM_PATH_R = /\/desktop\/custom\.scss$/
export const ROUTER_PATH_R = /site\/router.ts/

export const TEMP_STYLE_NAME = '__TEMP_STYLE__'

// mobile
export const MOBILE_COMP_PATH_R = /\/mobile\/index.vue$/
export const MOBILE_URL_PLACEHOLDER = '__MOBILE_URL_PLACEHOLDER__'
export const MOBILE_BUILD_PATH = `${sardConfig.base}mobile/`
