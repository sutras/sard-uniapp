import child_process from 'child_process'
import { resolve } from 'path'
import { MOBILE_BUILD_PATH } from '../utils/constants.js'

export function buildSiteMobile() {
  return child_process.exec(
    `npx uni build --outDir ../sard-uniapp/docs/mobile --base ${MOBILE_BUILD_PATH}`,
    {
      cwd: resolve(process.cwd(), '../sard-uniapp-demo'),
    },
  )
}
