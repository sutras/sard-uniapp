import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: 'happy-dom',
  },
})
