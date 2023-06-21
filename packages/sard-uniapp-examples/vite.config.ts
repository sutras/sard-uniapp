import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const uniPlugin = (uni as any).default ?? uni

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uniPlugin() as any],
})
