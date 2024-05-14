import child_process from 'child_process'
import { MOBILE_BUILD_PATH } from '../utils/constants.js'

export function buildSiteMobile() {
  return child_process.exec(
    `pnpm -w npx uni build --outDir packages/sard-uniapp/docs/mobile --base ${MOBILE_BUILD_PATH}`,
  )
}
