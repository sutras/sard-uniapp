import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import child_process from 'node:child_process'
import consola from 'consola'
import * as compiler from 'vue/compiler-sfc'
import esbuild from 'esbuild'
import { camelCase, upperFirst } from 'lodash-es'
import { CWD, docsSrcDir, libSrcDir, libOutDir, uniPluginDir } from './config'

const tempDir = path.resolve(CWD, 'node_modules/.sard-temp/')

const multiDefaultExport = ['components/popup/popup.vue']
const mapReadme: Record<string, string> = {
  'accordion-item': '../accordion',
  'dialog-agent': '../dialog',
  'action-sheet-agent': '../action-sheet',
  'dropdown-item': '../dropdown',
  'checkbox-group': '../checkbox',
  col: '../layout',
  'form-item': '../form',
  'form-plain': '../form',
  'form-item-plain': '../form',
  'grid-item': '../grid',
  'indexes-anchor': '../indexes',
  'list-item': '../list',
  'navbar-item': '../navbar',
  'notify-agent': '../notify',
  'popover-reference': '../popover',
  'radio-group': '../radio',
  row: '../layout',
  'sidebar-item': '../sidebar',
  'skeleton-avatar': '../skeleton',
  'skeleton-block': '../skeleton',
  'skeleton-paragraph': '../skeleton',
  'skeleton-title': '../skeleton',
  step: '../steps',
  'swipe-action-group': '../swipe-action',
  tab: '../tabs',
  'tabbar-item': '../tabbar',
  'table-cell': '../table',
  'table-row': '../table',
  'timeline-item': '../timeline',
  'toast-agent': '../toast',
  'waterfall-item': '../waterfall',
  'waterfall-load': '../waterfall',
  'dnd-item': '../dnd',
  'avatar-group': '../avatar',
}

async function deleteOutDir() {
  const content = await fsp.readFile(path.resolve(CWD, '.gitignore'), {
    encoding: 'utf8',
  })
  const _outDir = path.relative(CWD, libOutDir)
  const ignore = _outDir.replace(/^\.?\//, '')
  if (!new RegExp(`^${ignore}`, 'm').test(content)) {
    throw Error(`${_outDir} 不在 .gitignore 忽略规则中，有删除重要文件的风险`)
  }
  await fsp.rm(libOutDir, {
    force: true,
    recursive: true,
  })
}

async function copySrcToDist(pattern: string) {
  for await (const entry of fsp.glob(path.resolve(libSrcDir, pattern))) {
    const target = path.resolve(libOutDir, '.' + entry.replace(libSrcDir, ''))

    const targetPath = path.dirname(target)
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, {
        recursive: true,
      })
    }

    await fsp.copyFile(entry, target)
  }
}

const tsconfigPath = path.resolve(tempDir, '__temp-tsconfig.sard.json')

const vueTsconfig = {
  include: [`${libSrcDir}/**/*`],
  exclude: [`${libSrcDir}/**/test/**/*`],
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
    outDir: libOutDir,
  },
}

async function compileTsAndGenerateVueType() {
  const dir = path.dirname(tsconfigPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    })
  }
  await fsp.writeFile(tsconfigPath, JSON.stringify(vueTsconfig))

  const config = [['vue-tsc'], ['-p', tsconfigPath]].flat(Infinity).join(' ')

  await new Promise<void>((resolve, reject) => {
    const child = child_process.exec(`${config}`, async (err) => {
      await fsp.rm(tsconfigPath)
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })

    child.stdout!.on('data', (data) => {
      consola.log(data)
    })
  })

  for await (const entry of fsp.glob(
    path.resolve(libOutDir, './**/*.vue.js'),
  )) {
    await fsp.rm(entry)
  }

  for await (const entry of fsp.glob(
    path.resolve(libOutDir, './**/*.vue.d.ts'),
  )) {
    await fsp.rename(entry, entry.replace(/\.vue\.d\.ts$/, '.d.ts'))
  }

  if (multiDefaultExport.length > 0) {
    multiDefaultExport.forEach((item) => {
      const file = path.resolve(libOutDir, item).replace(/\.vue$/, '.d.ts')
      if (fs.existsSync(path.dirname(file))) {
        let content = fs.readFileSync(file, {
          encoding: 'utf-8',
        })

        const exportNames = (content.match(/export default (\w*)/g) || []).map(
          (item) => item.replace(/export default /, ''),
        )

        if (exportNames && exportNames.length > 1) {
          exportNames.forEach((name) => {
            const reg = new RegExp(`^declare const ${name}: {\\n`, 'm')
            if (reg.test(content)) {
              content = content.replace(
                new RegExp(`export default ${name}`),
                (m) => {
                  return `// ${m}`
                },
              )
            }
          })
          fs.writeFileSync(file, content)
        }
      }
    })
  }
}

async function copyLwa() {
  await copySrcToDist('./**/lwa.slim.*')
}

function geAllComponentName(script: string) {
  return script.match(/(?<=import\s+)\w+(?=\s+from\s+"[^"]+\.vue")/g)
}

function insertComponents(code: string, components: string[]) {
  return code.replace(/(?<=defineComponent\(\{\n)/, () => {
    return (
      `  components: {\n` +
      `${components.map((item) => `    ${item},\n`).join('')}` +
      `  },\n`
    )
  })
}

function doCompileVue(code: string, filePath: string) {
  let wxsMatch = ''

  let renderjsMatch = ''

  code = code
    .replace(/<script.*?lang="wxs".*?><\/script>/, (m) => {
      wxsMatch = m
      return ''
    })
    .replace(
      /<script module="render" lang="renderjs">[\s\S]+<\/script>/,
      (m) => {
        renderjsMatch = m
        return ''
      },
    )

  const { descriptor } = compiler.parse(code, {
    filename: filePath,
  })

  // template
  let compiledVue = `<template>${descriptor.template!.content}</template>\n\n`

  // wxs
  if (wxsMatch) {
    compiledVue += `<!-- #ifdef MP-WEIXIN -->\n${wxsMatch}\n<!-- #endif -->\n\n`
  }

  // script
  if (descriptor.script || descriptor.scriptSetup) {
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

    const components = geAllComponentName(transformedScript)
    if (components) {
      transformedScript = insertComponents(transformedScript, components)
    }

    compiledVue += `<script>\n${transformedScript}</script>\n`
  }

  // renderjs
  if (renderjsMatch) {
    compiledVue += `\n<!-- #ifdef APP-PLUS -->\n${renderjsMatch}\n<!-- #endif -->\n\n`
  }

  // style
  const style = descriptor.styles[0]

  if (style) {
    compiledVue += `\n<style lang="scss">${style.content}</style>`
  }

  return compiledVue
}

async function compileVue() {
  for await (const entry of fsp.glob(path.resolve(libSrcDir, './**/*.vue'))) {
    const target = path.resolve(libOutDir, '.' + entry.replace(libSrcDir, ''))

    const targetPath = path.dirname(target)
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, {
        recursive: true,
      })
    }

    const content = await fsp.readFile(entry, {
      encoding: 'utf8',
    })

    const vue = doCompileVue(content, entry)

    await fsp.writeFile(target, vue)
  }
}

async function handleGlobalComponent() {
  let content = await fsp.readFile(path.resolve(libSrcDir, 'global.d.ts'), {
    encoding: 'utf8',
  })

  content = content.replace(/\.vue/gm, '')

  await fsp.writeFile(path.resolve(libOutDir, 'global.d.ts'), content)
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

async function copyPackageJson() {
  await fsp.copyFile(
    path.resolve(libSrcDir, 'package.json'),
    path.resolve(libOutDir, 'package.json'),
  )
}

async function copyComponentsReadme() {
  for await (const entry of fsp.glob(
    path.resolve(docsSrcDir, 'components/**/*.md'),
  )) {
    const component = path.basename(entry, '.md')

    const target =
      path.dirname(
        path.resolve(libOutDir, '.' + entry.replace(docsSrcDir, '')),
      ) + `/${component}/README.md`

    const targetPath = path.dirname(target)
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, {
        recursive: true,
      })
    }

    await fsp.copyFile(entry, target)
  }
}

async function copyRootReadme() {
  await fsp.copyFile(
    path.resolve(CWD, 'README.md'),
    path.resolve(libOutDir, 'README.md'),
  )
}

async function copyChangelog() {
  await fsp.copyFile(
    path.resolve(CWD, 'CHANGELOG.md'),
    path.resolve(libOutDir, 'CHANGELOG.md'),
  )
}

function doParseMdTable(tableStr: string) {
  const match = tableStr.match(/^\|.+?$/gm)
  return match
    ? match
        .slice(2)
        .map((item) => item.replace(/^\s*\|\s*|\s*\|\s*$/g, ''))
        .map((item) => item.split(/\s*(?<!\\)\|\s*/))
    : []
}

function parseMdPropsTable(tableStr: string) {
  return doParseMdTable(tableStr).map(([prop, desc, type, defaultValue]) => {
    return [
      camelCase(prop.match(/^[\w-]+/)?.[0] || ''),
      desc,
      type.replace(/\\\|/g, '|'),
      defaultValue,
    ]
  })
}

function parseMdEmitsTable(tableStr: string) {
  return doParseMdTable(tableStr).map(([prop, desc, type]) => {
    return [prop.match(/^[\w-]+/)?.[0] || '', desc, type.replace(/\\\|/g, '|')]
  })
}

function parseMdTable(tableStr: string, title: string) {
  return title.endsWith('Props')
    ? parseMdPropsTable(tableStr)
    : parseMdEmitsTable(tableStr)
}

function getMdTableStr(content: string, title: string) {
  return (
    content.match(new RegExp(`\\n### ${title}\\b[\\s\\S]+?(?=\\n#|$)`, 'g')) ||
    []
  )
}

async function parseMdTableByTitle(
  file: string,
  title: string,
  content?: string,
) {
  const tableArr: string[][] = []

  if (typeof content === 'undefined') {
    if (!fs.existsSync(file)) {
      return tableArr
    }
    content = await fsp.readFile(file, {
      encoding: 'utf-8',
    })
  }

  const tableStrList = getMdTableStr(content, title)

  for (const tableStr of tableStrList) {
    const match = tableStr.match(/继承 \[`(.*?)`\]\((.+?|)#(.+?)\)/)
    // 继承
    if (match) {
      const [, , relativePath, extendTitle] = match

      // 其他文件
      if (relativePath) {
        const extendFile = path.resolve(
          path.dirname(file),
          '..',
          relativePath,
          'README.md',
        )
        tableArr.push(...(await parseMdTableByTitle(extendFile, extendTitle)))
      }
      // 当前文件
      else {
        tableArr.push(
          ...(await parseMdTableByTitle(file, extendTitle, content)),
        )
      }
    }

    tableArr.push(...parseMdTable(tableStr, title))
  }

  return tableArr
}

function deduplicateMdTable(table: string[][]) {
  return Object.values(Object.fromEntries(table.map((row) => [row[0], row])))
}

async function generateUniPropsType() {
  for await (const entry of fsp.glob(
    path.resolve(libOutDir, 'components', './**/*.vue'),
  )) {
    const content = await fsp.readFile(entry, {
      encoding: 'utf-8',
    })

    const filename = path.basename(entry, '.vue')

    let targetFile = ''
    const propsName = upperFirst(camelCase(filename)) + 'Props'
    const emitsName = upperFirst(camelCase(filename)) + 'Emits'
    const dir = path.dirname(entry)
    const readmeFile = path.resolve(dir, 'README.md')

    if (fs.existsSync(readmeFile)) {
      targetFile = readmeFile
    } else {
      const relativeDir = mapReadme[filename]
      if (relativeDir) {
        targetFile = path.resolve(dir, relativeDir, 'README.md')
      }
    }

    if (targetFile && fs.existsSync(targetFile)) {
      const propTable = deduplicateMdTable(
        await parseMdTableByTitle(targetFile, propsName),
      )
      const eventTable = deduplicateMdTable(
        await parseMdTableByTitle(targetFile, emitsName),
      )

      const docs: string[] = ['/**']

      propTable.forEach(([prop, desc, type, defaultValue]) => {
        docs.push(
          ` * @property {${type}} ${prop} ${desc}，默认值：${defaultValue}。`,
        )
      })

      eventTable.forEach(([prop, desc, type]) => {
        docs.push(` * @event {${type}} ${prop} ${desc}`)
      })

      docs.push(' */')
      const docsStr = docs.join('\n')

      const newContent = content.replace('export default', `${docsStr}\n$&`)

      await fsp.writeFile(entry, newContent)
    }
  }
}

async function generateUniModules() {
  if (!uniPluginDir.includes('uni_modules')) {
    throw Error(`${uniPluginDir} 不包含 'uni_modules'，有删除重要文件的风险`)
  }

  await fsp.rm(uniPluginDir, {
    force: true,
    recursive: true,
  })
  fs.mkdirSync(uniPluginDir, {
    recursive: true,
  })
  await fsp.cp(libOutDir, uniPluginDir, {
    recursive: true,
  })
}

export async function build() {
  const steps = [
    [deleteOutDir, `删除 ${libOutDir} 目录`],
    [compileTsAndGenerateVueType, `编译 ts 文件以及生成 vue 类型文件`],
    [copyLwa, `拷贝 lwa `],
    [compileVue, `编译 vue 文件`],
    [handleGlobalComponent, `全局组件类型处理`],
    [copyScss, `拷贝 scss 文件`],
    [copyStaticFiles, `拷贝静态资源`],
    [copyWxs, `拷贝 wxs 文件`],
    [copyPackageJson, `复制 package.json 文件`],
    [copyComponentsReadme, `复制组件 README.md 文件`],
    [copyRootReadme, `复制根 README.md 文件`],
    [generateUniPropsType, `生成 HbuilderX 类型提示`],
    [copyChangelog, `已复制 CHANGELOG.md 文件`],
    [generateUniModules, '已完成 uni_modules 目录构建'],
    [null, `已完成所有构建流程`],
  ] as const

  try {
    for (const [index, [step, msg]] of steps.entries()) {
      await step?.()
      consola.success(`[${index + 1}/${steps.length}] ${msg}`)
    }
  } catch (err) {
    consola.error(err)
  }
}

build()
