import child_process from 'child_process'
import { resolve } from 'path'

export function devMobile() {
  return child_process.exec('npx uni --base /sard/mobile/', {
    cwd: resolve(process.cwd(), '../sard-uniapp-demo'),
  })
}
