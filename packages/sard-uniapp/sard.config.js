export default {
  name: 'Sard',
  styles: ['assets/index.scss', 'components/index.scss'],
  base: '/sard/',
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
  site: {
    title: 'Sard uniapp',
    logo: 'logo.svg',
    description: 'Sard uniapp | uniapp UI 组件库',
    seo: {
      title: 'Sard uniapp | Vue Component',
      description: 'Sard uniapp | uniapp UI 组件库',
    },

    routes: [
      {
        title: '首页',
        path: '/',
        filePath: 'markdown/home.md',
      },
      {
        title: '指南',
        path: '/guide',
        index: 'intro',
        children: [
          {
            type: 'group',
            title: '开发指南',
            items: [
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
            ],
          },
        ],
      },
      {
        title: '组件',
        path: '/components',
        index: 'button',
        children: [
          {
            type: 'group',
            title: '基础组件',
            items: [
              {
                title: 'Button 按钮',
                path: 'button',
                filePath: 'components/button',
              },
              {
                title: 'icon 图标',
                path: 'icon',
                filePath: 'components/icon',
              },
              {
                title: 'Loading 加载',
                path: 'loading',
                filePath: 'components/loading',
              },
              {
                title: 'style 样式',
                path: 'style',
                filePath: 'components/style',
              },
            ],
          },
          {
            type: 'group',
            title: '布局',
            items: [
              {
                title: 'grid 栅格',
                path: 'grid',
                filePath: 'components/grid',
              },
            ],
          },
          {
            type: 'group',
            title: '表单组件',
            items: [
              {
                title: 'Calendar 日历',
                path: 'calendar',
                filePath: 'components/calendar',
              },
              // {
              //   title: 'Cascader 级联选择',
              //   path: 'cascader',
              //   filePath: 'components/cascader',
              // },
              // {
              //   title: 'Checkbox 复选框',
              //   path: 'checkbox',
              //   filePath: 'components/checkbox',
              // },
              // {
              //   title: 'DatetimePicker 日期时间选择器',
              //   path: 'datetimePicker',
              //   filePath: 'components/datetime-picker',
              // },
              // {
              //   title: 'Form 表单',
              //   path: 'form',
              //   filePath: 'components/form',
              // },
              // {
              //   title: 'Input 输入框',
              //   path: 'input',
              //   filePath: 'components/input',
              // },
              // {
              //   title: 'NumberKeyboard 数字键盘',
              //   path: 'numberKeyboard',
              //   filePath: 'components/number-keyboard',
              // },
              // {
              //   title: 'PasswordInput 密码输入框',
              //   path: 'passwordInput',
              //   filePath: 'components/password-input',
              // },
              // {
              //   title: 'Picker 选择器',
              //   path: 'picker',
              //   filePath: 'components/picker',
              // },
              // {
              //   title: 'Radio 单选按钮',
              //   path: 'radio',
              //   filePath: 'components/radio',
              // },
              // {
              //   title: 'Rate 评分',
              //   path: 'rate',
              //   filePath: 'components/rate',
              // },
              // {
              //   title: 'Slider 滑动器选择器',
              //   path: 'slider',
              //   filePath: 'components/slider',
              // },
              // {
              //   title: 'Stepper 步进器',
              //   path: 'stepper',
              //   filePath: 'components/stepper',
              // },
              // {
              //   title: 'Switch 开关',
              //   path: 'switch',
              //   filePath: 'components/switch',
              // },
              // {
              //   title: 'Upload 上传',
              //   path: 'upload',
              //   filePath: 'components/upload',
              // },
            ],
          },
          // {
          //   type: 'group',
          //   title: '数据展示',
          //   items: [
          //     {
          //       title: 'Avatar 头像',
          //       path: 'avatar',
          //       filePath: 'components/avatar',
          //     },
          //     {
          //       title: 'Accordion 手风琴',
          //       path: 'accordion',
          //       filePath: 'components/accordion',
          //     },
          //     {
          //       title: 'Badge 徽标',
          //       path: 'badge',
          //       filePath: 'components/badge',
          //     },
          //     {
          //       title: 'Cell 单元格',
          //       path: 'cell',
          //       filePath: 'components/cell',
          //     },
          //     {
          //       title: 'CountDown 倒计时',
          //       path: 'countDown',
          //       filePath: 'components/count-down',
          //     },
          //     {
          //       title: 'Empty 空状态',
          //       path: 'empty',
          //       filePath: 'components/empty',
          //     },
          //     {
          //       title: 'ImagePreview 图片预览 ',
          //       path: 'imagePreview',
          //       filePath: 'components/image-preview',
          //     },
          //     {
          //       title: 'ProgressBar 条形进度条',
          //       path: 'progressBar',
          //       filePath: 'components/progress-bar',
          //     },
          //     {
          //       title: 'ProgressCircle 环形进度条',
          //       path: 'progressCircle',
          //       filePath: 'components/progress-circle',
          //     },
          //     {
          //       title: 'Swiper 滑块视图容器',
          //       path: 'swiper',
          //       filePath: 'components/swiper',
          //     },
          //     {
          //       title: 'Tag 标签',
          //       path: 'tag',
          //       filePath: 'components/tag',
          //     },
          //   ],
          // },
          // {
          //   type: 'group',
          //   title: '导航组件',
          //   items: [
          //     {
          //       title: 'IndexBar 索引栏',
          //       path: 'indexBar',
          //       filePath: 'components/index-bar',
          //     },
          //     {
          //       title: 'Navbar 头部导航',
          //       path: 'navbar',
          //       filePath: 'components/navbar',
          //     },
          //     {
          //       title: 'Pagination 分页',
          //       path: 'pagination',
          //       filePath: 'components/pagination',
          //     },
          //     {
          //       title: 'Steps 步骤条',
          //       path: 'steps',
          //       filePath: 'components/steps',
          //     },
          //     {
          //       title: 'Tabbar 标签栏',
          //       path: 'tabbar',
          //       filePath: 'components/tabbar',
          //     },
          //     {
          //       title: 'Tabs 标签页',
          //       path: 'tabs',
          //       filePath: 'components/tabs',
          //     },
          //   ],
          // },
          // {
          //   type: 'group',
          //   title: '反馈组件',
          //   items: [
          //     {
          //       title: 'ActionSheet 动作面板',
          //       path: 'actionSheet',
          //       filePath: 'components/action-sheet',
          //     },
          //     {
          //       title: 'Dialog 对话框',
          //       path: 'dialog',
          //       filePath: 'components/dialog',
          //     },
          //     {
          //       title: 'Dropdown 下拉菜单',
          //       path: 'dropdown',
          //       filePath: 'components/dropdown',
          //     },
          //     {
          //       title: 'Notify 通知栏',
          //       path: 'notify',
          //       filePath: 'components/notify',
          //     },
          //     {
          //       title: 'Result 结果',
          //       path: 'result',
          //       filePath: 'components/result',
          //     },
          //     {
          //       title: 'ShareSheet 分享面板',
          //       path: 'shareSheet',
          //       filePath: 'components/share-sheet',
          //     },
          //     {
          //       title: 'Skeleton 骨架屏',
          //       path: 'skeleton',
          //       filePath: 'components/skeleton',
          //     },
          //     {
          //       title: 'Toast 轻提示',
          //       path: 'toast',
          //       filePath: 'components/toast',
          //     },
          //   ],
          // },
          // {
          //   type: 'group',
          //   title: '底层组件',
          //   items: [
          //     {
          //       title: 'Movable 可移动的',
          //       path: 'movable',
          //       filePath: 'components/movable',
          //     },
          //     {
          //       title: 'Collapse 折叠',
          //       path: 'collapse',
          //       filePath: 'components/collapse',
          //     },
          //     {
          //       title: 'Popout 弹出框',
          //       path: 'popout',
          //       filePath: 'components/popout',
          //     },
          //     {
          //       title: 'Popup 弹出层',
          //       path: 'popup',
          //       filePath: 'components/popup',
          //     },
          //     {
          //       title: 'Transition 过渡',
          //       path: 'transition',
          //       filePath: 'components/transition',
          //     },
          //   ],
          // },
          // {
          //   type: 'group',
          //   title: '底层库',
          //   items: [
          //     {
          //       title: 'Touch 触摸事件',
          //       path: 'touch',
          //       filePath: 'components/touch',
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
}
