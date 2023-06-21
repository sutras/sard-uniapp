import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { mergeSardConfig } from './mergeSardConfig.js'

// path
export const ROOT_DIR = resolve(
  fileURLToPath(dirname(import.meta.url)),
  '../../',
)
export const SITE_DIR = resolve(ROOT_DIR, './site')

export const CWD = process.cwd()

// sard config
export const SARD_CONFIG_NAME = 'sard.config.js'

const customConfig = (
  await import(pathToFileURL(resolve(CWD, SARD_CONFIG_NAME)))
).default

const mergedSardConfig = mergeSardConfig(customConfig)

export const sardConfig = mergedSardConfig

// site
export const DEV_PORT = 7761
export const PREVIEW_PORT = 7760
export const SITE_PATH_PREFIX = '@/site'

export const DEFAULT_README_NAME = 'README.md'

export const VIRTUAL_SARD_CONFIG = 'virtual:sard-config'

export const CONTEXT_PROVIDER_NAME = 'ContextProvider.tsx'

export const DEMO_DIR = 'demo'

export const MD_PATH_R = /\.md$/
export const CUSTOM_PATH_R = /\/desktop\/custom\.scss$/
export const ROUTER_PATH_R = /site\/desktop\/router.ts/

export const MD_DEMO_CODE_R = /<script type="code">([\s\S]*?)<\/script>/
export const MD_DEMO_CODE_SEPARATOR = '<script type="code"></script>'

export const TEMP_STYLE_NAME = '__TEMP_STYLE__'

// mobile
export const MOBILE_COMP_PATH_R = /\/mobile\/index.vue$/
export const MOBILE_URL_PLACEHOLDER = '__PLACEHOLDER__MOBILE_URL'
export const MOBILE_BUILD_PATH = '/sard/mobile/'
