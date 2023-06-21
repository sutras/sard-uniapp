import { createServer } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const uniPlugin = uni.default ?? uni

const server = await createServer({
  configFile: false,
  plugins: [uniPlugin()],
  base: '/sard/mobile/',
})
await server.listen()

// 原来的 server.config.logger.info 打印不出信息
server.config.logger.info = console.log

server.printUrls()

process.send({
  url: server.resolvedUrls.local[0],
})
