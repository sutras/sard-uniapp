import path from 'node:path'
import { defineConfig } from 'sard-cli'

export default defineConfig({
  name: 'Sard',
  base: '/sard-uniapp-docs/',
  publicDir: 'public',
  build: {
    srcDir: 'src/lib',
    outDir: 'dist',
    uniModulesDir: 'src/uni_modules',
    uniName: 'sard-uniapp',
  },
  codeAlias: {
    DEMO_PATH: path.resolve(process.cwd(), 'src/pages/components'),
  },
  mobile: true,
  git: [
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
    {
      name: 'Aliyun',
      branch: 'gh-pages',
      docsRepo: 'git@wzt.zone:/home/git/sard-uniapp-docs.git',
    },
  ],
  site: {
    outDir: 'docs',
    name: 'Sard Uniapp',
    logo: 'logo.svg',
    seo: {
      title: 'Sard uniapp | Vue Component',
      description: 'Sard uniapp | uniapp UI 组件库',
    },
    tags: [
      {
        tag: 'script',
        children:
          "var _hmt = _hmt || [];(function () { var hm = document.createElement('script'); hm.src = 'https://hm.baidu.com/hm.js?f83f5174c995e2f5c9520acb67f574b9'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s); })()",
      },
    ],
    homePath: '/home',
    copyright: 'MIT Licensed | Power By wuzhitao',
  },
})
