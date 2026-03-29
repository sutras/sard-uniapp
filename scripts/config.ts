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

export const docsBase = 'sard-uniapp-docs'
export const docsMobileBase = `${docsBase}/mobile`

export const changelogPath = path.resolve(CWD, 'CHANGELOG.md')

export const gitRepositories = [
  {
    name: 'Aliyun',
    branch: 'gh-pages',
    docsRepo: 'git@wzt.zone:/home/git/sard-uniapp-docs.git',
  },
  {
    name: 'Github',
    icon: 'github',
    url: 'https://github.com/sutras/sard-uniapp',
    branch: 'gh-pages',
    docsRepo: 'https://github.com/sutras/sard-uniapp-docs.git',
    main: true,
  },
  {
    name: 'Gitee',
    icon: 'gitee',
    url: 'https://gitee.com/sutras/sard-uniapp',
    branch: 'gh-pages',
    docsRepo: 'https://gitee.com/sutras/sard-uniapp-docs.git',
    pages: 'https://gitee.com/sutras/sard-uniapp/pages',
  },
]
