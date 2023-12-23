import path from 'node:path'

const srcDir = path.resolve(process.cwd(), 'src')

function getComponentPath(compPath) {
  return path.resolve(srcDir, 'components', compPath)
}

export default {
  name: 'Sard',
  styles: ['assets/index.scss'],
  base: '/sard-uniapp-docs/',
  publicDir: 'public',
  buildSite: {
    outDir: 'docs',
  },
  alias: [
    {
      find: /^sard-uniapp$/,
      replacement: '../../../index.ts',
    },
  ],
  build: {
    entry: 'src/index.ts',
    cssEntry: 'src/index.scss',
    name: 'Sard',
    fileName: 'index',
    srcDir: srcDir,
    outDir: 'dist',
    uniModulesDir: '../sard-uniapp-demo/src/uni_modules',
    uniName: 'sard-uniapp',
    external: ['vue'],
  },
  site: {
    title: 'Sard Uniapp',
    logo: 'logo.svg',
    seo: {
      title: 'Sard uniapp | Vue Component',
      description: 'Sard uniapp | uniapp UI 组件库',
    },
    tags: [
      {
        tag: 'script',
        children: `var _hmt = _hmt || []
          ;(function () {
            var hm = document.createElement('script')
            hm.src = 'https://hm.baidu.com/hm.js?f83f5174c995e2f5c9520acb67f574b9'
            var s = document.getElementsByTagName('script')[0]
            s.parentNode.insertBefore(hm, s)
          })()`,
      },
    ],

    routes: [
      {
        title: '首页',
        path: '/',
        filePath: 'markdown/home.md',
        index: '/guide/intro',
        hidden: true,
      },
      {
        title: '指引',
        path: '/guide',
        index: 'intro',
        children: [
          {
            type: 'group',
            title: '指引',
            path: '/guide',
            index: 'intro',
            children: [
              {
                title: '介绍',
                path: 'intro',
                filePath: 'markdown/intro.md',
              },
              {
                title: '快速上手',
                path: 'quickstart',
                filePath: 'markdown/quickstart.md',
              },
              {
                title: '国际化',
                path: 'i18n',
                filePath: getComponentPath('locale'),
              },
              {
                title: '暗黑模式',
                path: 'dark-mode',
                filePath: 'markdown/dark-mode.md',
              },
            ],
          },
        ],
      },
      {
        title: '组件',
        path: '/components',
        index: 'basic',
        children: [
          {
            type: 'group',
            title: '基础组件',
            path: 'basic',
            index: 'button',
            children: [
              {
                title: 'Button 按钮',
                path: 'button',
                filePath: getComponentPath('button'),
              },
              // {
              //   title: 'ConfigProvider 全局配置',
              //   path: 'config-provider',
              //   filePath: getComponentPath('config-provider'),
              // },
              {
                title: 'Icon 图标',
                path: 'icon',
                filePath: getComponentPath('icon'),
              },
              // {
              //   title: 'Locale 国际化',
              //   path: 'locale',
              //   filePath: getComponentPath('locale'),
              // },
              {
                title: 'style 样式',
                path: 'style',
                filePath: getComponentPath('style'),
              },
            ],
          },
          {
            type: 'group',
            title: '布局',
            path: 'layout',
            index: 'grid',
            children: [
              {
                title: 'Grid 宫格',
                path: 'grid',
                filePath: getComponentPath('grid'),
              },
              {
                title: 'Layout 布局',
                path: 'layout',
                filePath: getComponentPath('layout'),
              },
            ],
          },
          {
            type: 'group',
            title: '表单组件',
            path: 'form',
            index: 'calendar',
            children: [
              {
                title: 'Calendar 日历',
                path: 'calendar',
                filePath: getComponentPath('calendar'),
              },
              {
                title: 'CalendarInput 日历输入框',
                path: 'calendar-input',
                filePath: getComponentPath('calendar-input'),
              },
              {
                title: 'Cascader 级联选择',
                path: 'cascader',
                filePath: getComponentPath('cascader'),
              },
              {
                title: 'CascaderInput 级联输入框',
                path: 'cascader-input',
                filePath: getComponentPath('cascader-input'),
              },
              {
                title: 'Checkbox 复选框',
                path: 'checkbox',
                filePath: getComponentPath('checkbox'),
              },
              {
                title: 'DatetimePicker 日期时间选择器',
                path: 'datetime-picker',
                filePath: getComponentPath('datetime-picker'),
              },
              {
                title: 'DatetimePickerInput 日期时间输入框',
                path: 'datetime-picker-input',
                filePath: getComponentPath('datetime-picker-input'),
              },
              {
                title: 'Form 表单',
                path: 'form',
                filePath: getComponentPath('form'),
              },
              {
                title: 'Input 输入框',
                path: 'input',
                filePath: getComponentPath('input'),
              },
              {
                title: 'Keyboard 键盘',
                path: 'keyboard',
                filePath: getComponentPath('keyboard'),
              },
              {
                title: 'PasswordInput 密码输入框',
                path: 'password-input',
                filePath: getComponentPath('password-input'),
              },
              {
                title: 'Picker 选择器',
                path: 'picker',
                filePath: getComponentPath('picker'),
              },
              {
                title: 'PickerInput 选择器输入框',
                path: 'picker-input',
                filePath: getComponentPath('picker-input'),
              },
              {
                title: 'PopoutInput 弹出式输入框',
                path: 'popout-input',
                filePath: getComponentPath('popout-input'),
              },
              {
                title: 'Radio 单选按钮',
                path: 'radio',
                filePath: getComponentPath('radio'),
              },
              {
                title: 'Rate 评分',
                path: 'rate',
                filePath: getComponentPath('rate'),
              },
              {
                title: 'Search 搜索',
                path: 'search',
                filePath: getComponentPath('search'),
              },
              {
                title: 'Slider 滑动器选择器',
                path: 'slider',
                filePath: getComponentPath('slider'),
              },
              {
                title: 'Stepper 步进器',
                path: 'stepper',
                filePath: getComponentPath('stepper'),
              },
              {
                title: 'Switch 开关',
                path: 'switch',
                filePath: getComponentPath('switch'),
              },
              {
                title: 'Upload 上传',
                path: 'upload',
                filePath: getComponentPath('upload'),
              },
            ],
          },
          {
            type: 'group',
            title: '数据展示',
            path: 'data',
            index: 'avatar',
            children: [
              {
                title: 'Avatar 头像',
                path: 'avatar',
                filePath: getComponentPath('avatar'),
              },
              {
                title: 'Accordion 手风琴',
                path: 'accordion',
                filePath: getComponentPath('accordion'),
              },
              {
                title: 'Badge 徽标',
                path: 'badge',
                filePath: getComponentPath('badge'),
              },
              {
                title: 'Card 卡片',
                path: 'card',
                filePath: getComponentPath('card'),
              },
              {
                title: 'Collapse 折叠',
                path: 'collapse',
                filePath: getComponentPath('collapse'),
              },
              {
                title: 'CountDown 倒计时',
                path: 'count-down',
                filePath: getComponentPath('count-down'),
              },
              {
                title: 'List 列表',
                path: 'list',
                filePath: getComponentPath('list'),
              },
              {
                title: 'Empty 空状态',
                path: 'empty',
                filePath: getComponentPath('empty'),
              },
              {
                title: 'NoticeBar 公告栏',
                path: 'notice-bar',
                filePath: getComponentPath('notice-bar'),
              },
              {
                title: 'Popout 弹出框',
                path: 'popout',
                filePath: getComponentPath('popout'),
              },
              {
                title: 'Popover 气泡弹出框',
                path: 'popover',
                filePath: getComponentPath('popover'),
              },
              {
                title: 'Popup 弹出层',
                path: 'popup',
                filePath: getComponentPath('popup'),
              },
              {
                title: 'ProgressBar 条形进度条',
                path: 'progress-bar',
                filePath: getComponentPath('progress-bar'),
              },
              {
                title: 'ProgressCircle 环形进度条',
                path: 'progress-circle',
                filePath: getComponentPath('progress-circle'),
              },
              {
                title: 'SwiperDot 轮播图指示点',
                path: 'swiper-dot',
                filePath: getComponentPath('swiper-dot'),
              },
              {
                title: 'Tag 标签',
                path: 'tag',
                filePath: getComponentPath('tag'),
              },
            ],
          },
          {
            type: 'group',
            title: '导航组件',
            path: 'navigation',
            index: 'dropdown',
            children: [
              {
                title: 'Dropdown 下拉菜单',
                path: 'dropdown',
                filePath: getComponentPath('dropdown'),
              },
              {
                title: 'Indexes 索引',
                path: 'indexes',
                filePath: getComponentPath('indexes'),
              },
              {
                title: 'Navbar 头部导航',
                path: 'navbar',
                filePath: getComponentPath('navbar'),
              },
              {
                title: 'Pagination 分页',
                path: 'pagination',
                filePath: getComponentPath('pagination'),
              },
              {
                title: 'Steps 步骤条',
                path: 'steps',
                filePath: getComponentPath('steps'),
              },
              {
                title: 'Tabbar 标签栏',
                path: 'tabbar',
                filePath: getComponentPath('tabbar'),
              },
              {
                title: 'Tabs 标签页',
                path: 'tabs',
                filePath: getComponentPath('tabs'),
              },
            ],
          },
          {
            type: 'group',
            title: '反馈组件',
            path: 'feedback',
            index: 'action-sheet',
            children: [
              {
                title: 'ActionSheet 动作面板',
                path: 'action-sheet',
                filePath: getComponentPath('action-sheet'),
              },
              {
                title: 'Dialog 对话框',
                path: 'dialog',
                filePath: getComponentPath('dialog'),
              },
              {
                title: 'Loading 加载',
                path: 'loading',
                filePath: getComponentPath('loading'),
              },
              {
                title: 'Notify 通知栏',
                path: 'notify',
                filePath: getComponentPath('notify'),
              },
              {
                title: 'Overlay 遮罩层',
                path: 'overlay',
                filePath: getComponentPath('overlay'),
              },
              {
                title: 'Result 结果',
                path: 'result',
                filePath: getComponentPath('result'),
              },
              {
                title: 'ShareSheet 分享面板',
                path: 'share-sheet',
                filePath: getComponentPath('share-sheet'),
              },
              {
                title: 'Skeleton 骨架屏',
                path: 'skeleton',
                filePath: getComponentPath('skeleton'),
              },
              {
                title: 'Toast 轻提示',
                path: 'toast',
                filePath: getComponentPath('toast'),
              },
            ],
          },
        ],
      },
    ],
  },
}
