import child_process from 'node:child_process'
import { docsRelativeDir } from './config'

async function preview() {
  await new Promise<void>((resolve, reject) => {
    child_process
      .spawn('vitepress', ['preview', docsRelativeDir], {
        shell: true,
        stdio: 'inherit',
      })
      .on('exit', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`vitepress preview exited with code ${code}`))
        }
      })
  })
}

preview()
