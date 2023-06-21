import child_process from 'child_process'
import { resolve } from 'path'

export const uniProcess = child_process.fork('lib/build-site.js', {
  cwd: resolve(process.cwd(), '../sard-uniapp-examples'),
})
