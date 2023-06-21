import child_process from 'child_process'
import { resolve } from 'path'

export const uniProcess = child_process.fork('lib/dev.js', {
  cwd: resolve(process.cwd(), '../sard-uniapp-examples'),
})

uniProcess.on('message', (data) => {
  if (data.url) {
    process.sard.url = data.url
    process.emit('url', data.url)
  }
})
