import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { transformIndexHtmlPlugin } from './transformIndexHtmlPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), transformIndexHtmlPlugin()],
  resolve: {
    alias: [
      {
        find: /^sard-uniapp/,
        replacement: 'sard-uniapp/src',
      },
    ],
  },
})
