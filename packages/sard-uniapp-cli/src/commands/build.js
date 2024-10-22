import fse from 'fs-extra'
import fs from 'fs/promises'
import path from 'node:path'
import { CWD, sardConfig } from '../utils/constants.js'
import child_process from 'child_process'
import { glob } from 'glob'
import consola from 'consola'
import { rimraf } from 'rimraf'
import * as compiler from 'vue/compiler-sfc'
import esbuild from 'esbuild'

const { build: buildConfig } = sardConfig

const outDir = path.resolve(CWD, buildConfig.outDir)
const srcDir = path.resolve(CWD, buildConfig.srcDir)
const uniModulesDir = path.resolve(CWD, buildConfig.uniModulesDir)

async function deleteOutDir() {
  await rimraf(outDir)
}

async function copySrcToDist(pattern) {
  const result = await glob(path.resolve(srcDir, pattern))
  const targetResult = result.map((file) =>
    path.resolve(outDir, '.' + file.replace(srcDir, '')),
  )

  await Promise.all(
    result.map(async (source, index) => {
      const target = targetResult[index]
      const targetPath = path.dirname(target)
      if (!fse.existsSync(targetPath)) {
        fse.mkdirsSync(targetPath)
      }
      await fse.copyFile(source, target)
    }),
  )
}

const tsconfigPath = `${process.cwd()}/__tsconfig.json`

const vueTsconfig = {
  include: [`${srcDir}/**/*`],
  exclude: [`${srcDir}/**/test/*`],
  compilerOptions: {
    target: 'esnext',
    resolveJsonModule: true,
    esModuleInterop: true,
    moduleResolution: 'node',
    declaration: true,
    strict: true,
    noImplicitAny: false,
    noUnusedLocals: true,
    noUnusedParameters: true,
    types: ['@dcloudio/types'],
    skipLibCheck: true,
    module: 'esnext',
    outDir: outDir,
  },
}

async function compileTsAndGenerateVueType() {
  await fs.writeFile(tsconfigPath, JSON.stringify(vueTsconfig))

  const config = [['vue-tsc'], ['-p', tsconfigPath]].flat(Infinity).join(' ')

  await new Promise((resolve, reject) => {
    const child = child_process.exec(`${config}`, (err) => {
      fs.rm(tsconfigPath)
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })

    child.stdout.on('data', (data) => {
      console.log(data)
    })
  })

  const vueJs = await glob(path.resolve(outDir, './**/*.vue.js'))
  for (const file of vueJs) {
    await fs.rm(file)
  }

  const vueDts = await glob(path.resolve(outDir, './**/*.vue.d.ts'))
  for (const file of vueDts) {
    await fs.rename(file, file.replace(/\.vue\.d\.ts$/, '.d.ts'))
  }
}

async function copyLwa() {
  await copySrcToDist('./**/lwa.slim.*')
}

function geAllComponentName(script) {
  return script.match(/(?<=import\s+)\w+(?=\s+from\s+"[^"]+\.vue")/g)
}

function insertComponents(code, components) {
  return code.replace(/(?<=defineComponent\(\{\n)/, () => {
    return (
      `  components: {\n` +
      `${components.map((item) => `    ${item},\n`).join('')}` +
      `  },\n`
    )
  })
}

function doCompileVue(code, filePath) {
  let wxsMatch = ''
  code = code.replace(/<script.*?lang="wxs".*?><\/script>/, (m) => {
    wxsMatch = m
    return ''
  })
  const { descriptor } = compiler.parse(code, {
    filename: filePath,
  })

  const style = descriptor.styles[0]

  const compiledScript = compiler
    .compileScript(descriptor, {
      id: filePath,
      inlineTemplate: false,
    })
    .content.replace(/^.*__isScriptSetup.*$/m, '')
    // 转义uniapp条件注释，避免被esbuild删掉
    .replace(/\/\/ #/g, '//! #')

  let transformedScript = esbuild
    .transformSync(compiledScript, {
      loader: 'ts',
      legalComments: 'inline',
    })
    .code.replace(/\/\/! #/g, '// #')
    .replace(/\/\* @__PURE__ \*\//g, '')

  let compiledVue = `<template>${descriptor.template.content}</template>\n\n`

  if (wxsMatch) {
    compiledVue += `<!-- #ifdef MP-WEIXIN -->\n${wxsMatch}\n<!-- #endif -->\n\n`
  }

  const components = geAllComponentName(transformedScript)
  if (components) {
    transformedScript = insertComponents(transformedScript, components)
  }

  compiledVue += `<script>\n${transformedScript}</script>\n`

  if (style) {
    compiledVue += `\n<style lang="scss">${style.content}</style>`
  }

  return compiledVue
}

async function compileVue() {
  const result = await glob(path.resolve(srcDir, './**/*.vue'))
  const targetResult = result.map((file) =>
    path.resolve(outDir, '.' + file.replace(srcDir, '')),
  )

  await Promise.all(
    result.map(async (source, index) => {
      const target = targetResult[index]
      const targetPath = path.dirname(target)
      if (!fse.existsSync(targetPath)) {
        fse.mkdirsSync(targetPath)
      }

      const content = await fs.readFile(source, {
        encoding: 'utf8',
      })

      const vue = doCompileVue(content, source)

      await fs.writeFile(target, vue)
    }),
  )
}

async function handleGlobalComponent() {
  let content = await fs.readFile(path.resolve(srcDir, 'global.d.ts'), {
    encoding: 'utf8',
  })

  content = content.replace(/\.vue/gm, '')

  await fs.writeFile(path.resolve(outDir, 'global.d.ts'), content)
}

async function copyScss() {
  await copySrcToDist('./**/*.scss')
}

async function copyStaticFiles() {
  await copySrcToDist('./**/*.{jpg,png,gif,jpeg,ttf,svg}')
}

async function copyWxs() {
  await copySrcToDist('./**/*.wxs')
}

async function generateChangelog() {
  await new Promise((resolve, reject) => {
    child_process.exec(
      `conventional-changelog -p angular -i changelog.md -s -r 0`,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      },
    )
  })
}

async function copyPackageJson() {
  await fse.copyFile(
    path.resolve(CWD, 'package.json'),
    path.resolve(outDir, 'package.json'),
  )
}

async function copyReadme() {
  await fse.copyFile(
    path.resolve(CWD, '../../README.md'),
    path.resolve(outDir, 'README.md'),
  )
}

async function copyChangelog() {
  await fse.copyFile(
    path.resolve(CWD, 'changelog.md'),
    path.resolve(outDir, 'changelog.md'),
  )
}

async function generateUniModules() {
  const pluginDir = path.resolve(uniModulesDir, buildConfig.uniName)

  await rimraf(pluginDir)
  fse.mkdirsSync(pluginDir)
  fse.copy(outDir, path.resolve(pluginDir))
}

export async function build() {
  const steps = [
    [deleteOutDir, `已删除 ${outDir} 目录`],
    [compileTsAndGenerateVueType, `已完成 ts 文件编译以及生成 vue 类型文件`],
    [copyLwa, `已完成 lwa 拷贝`],
    [compileVue, `已完成 vue 文件编译`],
    [handleGlobalComponent, `已完成全局组件类型处理`],
    [copyScss, `已完成 scss 拷贝`],
    [copyStaticFiles, `已完成静态资源拷贝`],
    [copyWxs, `已完成 wxs 拷贝`],
    [generateChangelog, `已完 changelog.md 文件生成`],
    [copyPackageJson, `已复制 package.json 文件`],
    [copyReadme, `已复制 README.md 文件`],
    [copyChangelog, `已复制 changelog.md 文件`],
    [generateUniModules, '已完成 uni_modules 目录构建'],
    [null, `已完成所有构建流程`],
  ]

  try {
    for (let [index, [step, msg]] of steps.entries()) {
      await step?.()
      consola.success(`[${index + 1}/${steps.length}] ${msg}`)
    }
  } catch (err) {
    consola.error('构建失败')
    console.log(err)
  }
}
