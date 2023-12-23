/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { defineConfig as vitestDefineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const vitestConfig = vitestDefineConfig({
  test: {
    include: ['./src/**/test/*.test.ts'],
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
  },
})

export default defineConfig({
  plugins: [vue()],
  ...(vitestConfig as any),
})
