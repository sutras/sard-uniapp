/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { defineConfig as vitestDefineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const vitestConfig = vitestDefineConfig({
  test: {
    include: ['./src/**/*.test.*'],
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@dcloudio/uni-app': resolve('./mocks/@dcloudio/uni-app.ts'),
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})

export default defineConfig({
  plugins: [vue(), VueJsx()],
  ...(vitestConfig as any),
})
