import fse from 'fs-extra'
import { relative, resolve } from 'node:path'
import { build as viteBuild } from 'vite'
import {
  CWD,
  SITE_DIR,
  sardConfig,
  TEMP_STYLE_NAME,
} from '../utils/constants.js'
import deepMerge from '../utils/deepMerge.js'

const { build: buildConfig } = sardConfig

const outDir = resolve(CWD, sardConfig.build.outDir)

function mergedBuildLibConfig(options) {
  return deepMerge(
    {
      configFile: false,
      root: SITE_DIR,
      build: {
        copyPublicDir: false,
        outDir: relative(SITE_DIR, outDir),
        lib: {},
      },
    },
    options,
  )
}

const formatOptions = [
  {
    minify: false,
    formats: ['es', 'cjs', 'umd'],
  },
  {
    minify: 'terser',
    formats: ['umd'],
  },
]

function buildLib() {
  return Promise.all(
    formatOptions.map((options) => {
      return viteBuild(
        mergedBuildLibConfig({
          build: {
            lib: {
              entry: resolve(CWD, buildConfig.entry),
              name: buildConfig.name,
              formats: options.formats,
              fileName(format) {
                return `${buildConfig.fileName}.${format}${
                  options.minify ? '.min' : ''
                }.js`
              },
            },
            minify: options.minify,
            rollupOptions: {
              external: buildConfig.external,
              output: {
                globals: buildConfig.globals,
              },
            },
          },
        }),
      )
    }),
  )
}

async function buildCss() {
  await viteBuild(
    mergedBuildLibConfig({
      build: {
        emptyOutDir: false,
        lib: {
          entry: resolve(CWD, buildConfig.cssEntry),
          formats: ['es'],
          fileName: TEMP_STYLE_NAME,
        },
      },
    }),
  )

  await fse.remove(resolve(outDir, `${TEMP_STYLE_NAME}.js`))

  await fse.rename(
    resolve(outDir, 'style.css'),
    resolve(outDir, `${buildConfig.fileName}.css`),
  )
}

export async function build() {
  await Promise.all([buildLib(), buildCss()])
}
