export default {
  name: 'Sard',
  styles: ['assets/index.scss', 'src/components/index.scss'],
  base: '/sard/',
  publicDir: 'public',
  buildSite: {
    outDir: 'docs',
  },
  build: {
    entry: 'src/index.ts',
    cssEntry: 'src/style.ts',
    name: 'Sard',
    fileName: 'sard',
    outDir: 'dist',
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
    seo: {
      title: 'Sard uniapp | Vue Component',
      description: 'Sard uniapp | Vue 移动端 UI 组件库',
    },
    routes: [
      {
        title: '首页',
        path: '/',
        filePath: 'markdown/home.md',
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
                filePath: 'src/components/button',
              },
            ],
          },
        ],
      },
    ],
  },
}
