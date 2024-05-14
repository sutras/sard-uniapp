import { PluginOption, ResolvedConfig } from 'vite'

export function transformIndexHtmlPlugin() {
  let config: ResolvedConfig

  return {
    name: 'transformIndexHtmlPlugin',
    enforce: 'post',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
    transformIndexHtml(html: any) {
      html = html.replace(/<title>.*?<\/title>/, '')

      return {
        html,
        tags: [
          {
            tag: 'title',
            children: 'Sard uniapp | Vue Component',
          },
          {
            tag: 'meta',
            attrs: {
              name: 'description',
              content: 'Sard uniapp | uniapp UI 组件库',
            },
          },
          {
            tag: 'link',
            attrs: {
              rel: 'icon',
              type: 'image/svg+xml',
              href: config.base + 'static/logo.svg',
            },
          },

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
      }
    },
  } as PluginOption
}
