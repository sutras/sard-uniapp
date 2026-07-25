import { defineConfig, type PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { transformIndexHtmlPlugin } from './transformIndexHtmlPlugin'
import tailwindcss from 'tailwindcss'
import vitePluginPagesTypings from './vite-plugin-pages-typings'

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
  server: {
    // sard-uniapp 通过 pnpm workspace 符号链接进 node_modules，
    // 默认会被 vite 忽略，这里取消忽略以支持 HMR
    watch: {
      ignored: ['!**/sard-uniapp/**'],
      usePolling: false,
    },
    // 允许访问 workspace 符号链接指向的源码
    fs: {
      strict: false,
    },
    host: true,
  },
  optimizeDeps: {
    // sard-uniapp 是 workspace 源码包，必须 exclude 才能走 HMR
    // 去掉 force: true，依赖未变化时复用缓存，避免每次启动重新打包且可能出错
    exclude: ['sard-uniapp'],
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
    preprocessorOptions: {
      scss: {
        // 静默依赖包（sard-uniapp）的 Sass 弃用警告，避免 117+ 组件的
        // warning 大量输出拖慢首屏编译
        quietDeps: true,
        silenceDeprecations: ['import', 'legacy-js-api'],
      },
    },
  },
  plugins: [
    vitePluginUncommentWxs(['pull-down-refresh.vue']),
    uni(),
    transformIndexHtmlPlugin(),
    vitePluginPagesTypings(),
  ],
})
