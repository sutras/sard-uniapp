import path from 'node:path'
import { defineConfig } from 'sard-cli'
import pkgJson from './package.json' with { type: 'json' }

export default defineConfig({
  name: 'Sard',
  base: '/sard-uniapp-docs/',
  publicDir: 'public',
  build: {
    srcDir: 'src/lib',
    outDir: 'dist',
    uniModulesDir: 'src/uni_modules',
    uniName: 'sard-uniapp',
    mapReadme: {
      'accordion-item': '../accordion',
      'dialog-agent': '../dialog',
      'dropdown-item': '../dropdown',
      'checkbox-group': '../checkbox',
      col: '../layout',
      'form-item': '../form',
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
      tab: '../tabs',
      'tabbar-item': '../tabbar',
      'table-cell': '../table',
      'table-row': '../table',
      'timeline-item': '../timeline',
      'toast-agent': '../toast',
      'waterfall-item': '../waterfall',
      'waterfall-load': '../waterfall',
      'dnd-item': '../dnd',
    },
    multiDefaultExport: ['components/popup/popup.vue'],
  },
  codeAlias: {
    DEMO_PATH: path.resolve(process.cwd(), 'src/pages/components'),
    COMP_PATH: path.resolve(process.cwd(), 'src/lib/components'),
    CWD: path.resolve(process.cwd()),
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
    homePath: '/',
    copyright: 'Power By wuzhitao',
    license: {
      text: 'MIT Licensed',
      link: 'https://opensource.org/license/MIT',
    },
    icp: {
      text: '粤ICP备2023157350号',
      link: 'https://beian.miit.gov.cn/',
    },
    nav: [
      {
        text: pkgJson.version,
        items: [
          {
            text: '更新日志 (Github)',
            link: 'https://github.com/sutras/sard-uniapp/blob/main/CHANGELOG.md',
          },
          {
            text: '更新日志 (Gitee)',
            link: 'https://gitee.com/sutras/sard-uniapp/blob/main/CHANGELOG.md',
          },
        ],
      },
      {
        text: '友情链接',
        items: [
          {
            text: 'Cosey Admin',
            link: 'https://docs.cosey.wzt.zone/',
          },
        ],
      },
    ],
  },
})
