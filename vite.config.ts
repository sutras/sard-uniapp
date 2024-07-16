import { defineConfig, type PluginOption, type ViteDevServer } from 'vite'
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

function vitePluginWatchNodeModules() {
  return {
    name: 'vitePluginWatchNodeModules',
    configureServer: (server: ViteDevServer): void => {
      server.watcher.options = {
        ...server.watcher.options,
        ignored: [/node_modules\/(?!sard-uniapp).*/, '**/.git/**'],
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
    vitePluginWatchNodeModules(),
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
