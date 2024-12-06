import { defineConfig, type PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'node:path'
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
  optimizeDeps: {
    exclude: ['sard-uniapp'],
    force: true,
  },
  plugins: [
    vitePluginUncommentWxs(['pull-down-refresh.vue']),
    uni(),
    transformIndexHtmlPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: /^sard-uniapp/,
        replacement: path.resolve(process.cwd(), './src/lib'),
      },
      {
        find: /^sard-uniapp$/,
        replacement: path.resolve(process.cwd(), './src/lib/index.ts'),
      },
    ],
  },
})
