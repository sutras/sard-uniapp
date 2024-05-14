import child_process from 'child_process'
import { MOBILE_BUILD_PATH } from '../utils/constants.js'

export function devMobile() {
  return child_process.exec(`pnpm -w npx uni --base ${MOBILE_BUILD_PATH}`)
}
