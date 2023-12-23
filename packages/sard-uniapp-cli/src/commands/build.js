import fse from 'fs-extra'
import fs from 'fs/promises'
import path, { resolve } from 'node:path'
import { CWD, sardConfig } from '../utils/constants.js'
import child_process from 'child_process'
import { glob } from 'glob'
import consola from 'consola'
import { rimraf } from 'rimraf'
import * as compiler from 'vue/compiler-sfc'
import esbuild from 'esbuild'

const { build: buildConfig } = sardConfig

const outDir = resolve(CWD, buildConfig.outDir)
const srcDir = resolve(CWD, buildConfig.srcDir)
const uniModulesDir = resolve(CWD, buildConfig.uniModulesDir)

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

const sharedTscConfig = [
  ['--target', 'esnext'],
  ['--resolveJsonModule'],
  ['--esModuleInterop'],
  ['--moduleResolution', 'node'],
  ['--declaration'],
  ['--strict'],
  ['--noUnusedLocals'],
  ['--noUnusedParameters'],
  ['--types', '@dcloudio/types'],
  ['--skipLibCheck'],
  ['--module', 'esnext'],
  ['--outDir', outDir],
]

async function compileTs() {
  const config = [
    ['tsc'],
    [`${srcDir}/**/*.ts`, `${srcDir}/*.ts`],
    sharedTscConfig,
  ]
    .flat(Infinity)
    .join(' ')

  await new Promise((resolve, reject) => {
    child_process.exec(`${config}`, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })

  await copySrcToDist('global.d.ts')
}

// async function generateVueType() {
//   const config = [
//     ['vue-tsc'],
//     [`${srcDir}/**/*.vue`],
//     ['--emitDeclarationOnly'],
//     sharedTscConfig,
//   ]
//     .flat(Infinity)
//     .join(' ')

//   await new Promise((resolve, reject) => {
//     child_process.exec(`${config}`, (err) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve()
//       }
//     })
//   })
// }

function doCompileVue(code, filePath) {
  const { descriptor } = compiler.parse(code, {
    filename: filePath,
  })

  descriptor.template.content
  const style = descriptor.styles[0]

  const compiledScript = compiler
    .compileScript(descriptor, {
      id: filePath,
      inlineTemplate: false,
    })
    .content.replace(/^.*__isScriptSetup.*$/m)

  const transformedScript = esbuild.transformSync(compiledScript, {
    loader: 'ts',
  }).code

  let compiledVue =
    `<template>${descriptor.template.content}</template>\n\n` +
    `<script lang="ts">\n${transformedScript}</script>\n`

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

async function copyScss() {
  await copySrcToDist('./**/*.scss')
}

async function copyStaticFiles() {
  await copySrcToDist('./**/*.{jpg,png,gif,jpeg,ttf,svg}')
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

async function generateUniModules() {
  const pluginDir = path.resolve(uniModulesDir, buildConfig.uniName)

  await rimraf(pluginDir)
  fse.mkdirsSync(pluginDir)
  fse.copy(outDir, path.resolve(pluginDir))
}

export async function build() {
  const steps = [
    [deleteOutDir, `已删除 ${outDir} 目录`],
    [compileTs, `已完成 ts 文件编译打包`],
    [compileVue, `已完成 vue 文件编译`],
    // [generateVueType, `已生成vue文件类型`],
    [copyScss, `已完成 scss 拷贝`],
    [copyStaticFiles, `已完成静态资源拷贝`],
    [copyPackageJson, `已复制 package.json`],
    [copyReadme, `已复制 README.md`],
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
