/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { defineConfig as vitestDefineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

const vitestConfig = vitestDefineConfig({
  test: {
    include: ['./src/**/test/*.test.*'],
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
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
