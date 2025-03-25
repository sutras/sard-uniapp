/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { defineConfig as vitestDefineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const vitestConfig = vitestDefineConfig({
  test: {
    include: ['./src/lib/**/*.test.*'],
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        width: 375,
        height: 667,
        settings: {
          navigator: {
            userAgent:
              'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/127.0.0.0',
          },
        },
      },
    },
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@dcloudio/uni-app': resolve('./mocks/@dcloudio/uni-app.ts'),
    },
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
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
