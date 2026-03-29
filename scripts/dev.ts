import child_process from 'node:child_process'
import stripAnsi from 'strip-ansi'
import { docsBase, docsMobileBase, docsRelativeDir } from './config'

function createMobileProcess() {
  return child_process.exec(`npx uni --base ${docsMobileBase} --host`, {
    env: {
      ...process.env,
      FORCE_COLOR: 'true',
      CI: 'false',
    },
  })
}

function createDocsProcess(h5LocalUrl: string) {
  const child = child_process.exec(
    `vitepress dev ${docsRelativeDir} --base /${docsBase}/ --host`,
    {
      env: {
        ...process.env,
        VITE_H5_LOCAL_URL: h5LocalUrl,
        FORCE_COLOR: 'true',
        CI: 'false',
      },
    },
  )

  child.stdout?.on('data', (data) => {
    console.log(data)
  })

  child.stderr?.on('data', (data) => {
    console.error(data)
  })

  return child
}

export async function dev() {
  const child = createMobileProcess()

  let start = false

  child.stdout!.on('data', (data) => {
    const output = data.toString()
    console.log(output)

    // 匹配 Local 和 Network 地址
    const localMatch = output.match(/Local.+http:\/\//)

    if (localMatch) {
      const stripedOutput = stripAnsi(output)

      const localUrl = stripedOutput.match(/http:\/\/.+/)![0]

      if (!start) {
        createDocsProcess(localUrl)
        start = true
      }
    }
  })

  child.stderr!.on('data', (data) => {
    console.error(data.toString())
  })
}

dev()
