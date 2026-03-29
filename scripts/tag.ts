import child_process from 'node:child_process'
import packageJson from '../package.json' with { type: 'json' }

export async function tag() {
  await new Promise<void>((resolve, reject) => {
    child_process.exec(`git tag v${packageJson.version}`, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
