import child_process from 'child_process'
import { resolve } from 'path'

export function forkChildProcess() {
  return child_process.fork('lib/dev.js', {
    cwd: resolve(process.cwd(), '../sard-uniapp-examples'),
  })
}
