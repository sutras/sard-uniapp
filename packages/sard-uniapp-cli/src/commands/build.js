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

// import * as sass from 'sass'

const { build: buildConfig } = sardConfig

const outDir = resolve(CWD, buildConfig.outDir)
const srcDir = resolve(CWD, buildConfig.srcDir)
// const cssEntry = resolve(CWD, buildConfig.cssEntry)

async function deleteOutDir() {
  await rimraf(outDir)
}

const sharedTscConfig = [
  ['tsc'],
  [`${srcDir}/**/*.ts`, `${srcDir}/*.ts`],
  ['--target', 'esnext'],
  ['--resolveJsonModule'],
  ['--esModuleInterop'],
  ['-moduleResolution', 'node'],
  ['--declaration'],
  ['--strict'],
  ['--noUnusedLocals'],
  ['--noUnusedParameters'],
  ['--types', '@dcloudio/types'],
]

async function compileTs() {
  const config = [sharedTscConfig, ['--module', 'esnext'], ['--outDir', outDir]]
    .flat(Infinity)
    .join(' ')

  await new Promise((resolve, reject) => {
    child_process.exec(`${config}`, (err, stdout) => {
      if (err) {
        reject(stdout)
      } else {
        resolve()
      }
    })
  })

  const result = path.resolve(srcDir, 'global.d.ts')
  const target = path.resolve(outDir, '.' + result.replace(srcDir, ''))
  await fse.copyFile(result, target)
}

function doCompileVue(code, path) {
  const { descriptor } = compiler.parse(code, {
    filename: path,
  })

  descriptor.template.content
  const style = descriptor.styles[0]

  const compiledScript = compiler.compileScript(descriptor, {
    id: path,
  }).content

  const transformedScript = esbuild.transformSync(compiledScript, {
    loader: 'ts',
  }).code

  let compiledVue =
    `<template>${descriptor.template.content}</template>\n\n` +
    `<script>\n${transformedScript}</script>\n`

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

      // 编译vue
      const content = await fs.readFile(source, {
        encoding: 'utf8',
      })

      const vueCode = doCompileVue(content, source)

      await fs.writeFile(target, vueCode)
    }),
  )
}

async function copyScss() {
  const result = await glob(path.resolve(srcDir, './**/*.scss'))
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

async function buildCss() {
  await copyScss()
}

export async function build() {
  try {
    await deleteOutDir()
    consola.success(`[1/5] 已删除 ${outDir} 目录`)

    await compileTs()
    consola.success('[2/5] 已完成ts文件编译打包')

    await compileVue()
    consola.success('[3/5] 已完成vue文件编译')

    await buildCss()
    consola.success('[4/5] 已完成 scss 拷贝')

    consola.success('[5/5] 已完成所有构建流程')
  } catch (err) {
    consola.error('构建失败')
    console.log(err)
  }
}
