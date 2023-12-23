import child_process from 'child_process'
import { resolve } from 'path'
import { MOBILE_BUILD_PATH } from '../utils/constants.js'

export function devMobile() {
  return child_process.exec(`npx uni --base ${MOBILE_BUILD_PATH}`, {
    cwd: resolve(process.cwd(), '../sard-uniapp-demo'),
  })
}
