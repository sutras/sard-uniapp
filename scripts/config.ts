import path from 'node:path'

export const CWD = process.cwd()

export const libSrcDir = path.resolve(CWD, 'packages/sard-uniapp')
export const libOutDir = path.resolve(CWD, 'dist')

export const uniModulesDir = path.resolve(CWD, 'uni_modules')
export const uniPluginDir = path.resolve(uniModulesDir, 'sard-uniapp')

export const docsRelativeDir = 'packages/docs'

export const docsSrcDir = path.resolve(CWD, docsRelativeDir)
export const docsOutDir = path.resolve(CWD, 'docs')
export const docsMobileOutDir = path.resolve(docsOutDir, 'mobile')

export const docsBase = '/'
export const docsMobileBase = `mobile`

export const changelogPath = path.resolve(CWD, 'CHANGELOG.md')
