import { createServer } from 'vite'
import mergeViteConfig from '../utils/mergeViteConfig.js'
import { devMobile } from './dev-mobile.js'
import chalk from 'chalk'

const createViteDevServer = async () => {
  const server = await createServer(
    mergeViteConfig({
      async onRestart() {
        console.log('onRestart')
        await server.close()
        createViteDevServer()
      },
    }),
  )
  await server.listen()
  server.printUrls()
}

export async function dev() {
  const child = devMobile()

  function logUrl(platform, url) {
    console.log(
      `  ${chalk.green('➜')}  ${chalk.bold(platform)}:   ${chalk.cyan(url)}`,
    )
  }

  let log = ''
  let timer = null
  let start = false

  child.stderr.on('data', (data) => {
    console.log(data)
  })

  child.stdout.on('data', (data) => {
    log += data

    if (/http:/.test(log) && !start) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const urls = log.match(/http:\/\/.+/g)
        logUrl('Local', urls[0])
        logUrl('Network', urls[1])

        process.sard.url = urls[1]

        if (!start) {
          start = true
          createViteDevServer()
        }
      }, 500)
    }
  })
}
