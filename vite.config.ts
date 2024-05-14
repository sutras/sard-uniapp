import { defineConfig, PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { transformIndexHtmlPlugin } from './transformIndexHtmlPlugin'

function vitePluginUncommentWxs(files: string[]): PluginOption {
  return {
    name: 'vitePluginUncommentWxs',
    enforce: 'pre',
    transform(code, id) {
      if (files.some((file) => id.includes(file))) {
        return code.replace(
          /<!-- (<script.*?lang="wxs"><\/script>) -->/gm,
          '$1',
        )
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginUncommentWxs(['pull-down-refresh.vue']),
    uni(),
    transformIndexHtmlPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: /^sard-uniapp/,
        replacement: 'sard-uniapp/src',
      },
    ],
  },
})
