import child_process from 'child_process'
import { resolve } from 'path'

export function buildSiteMobile() {
  return child_process.exec(
    'npx uni build --outDir ../sard-uniapp/docs/mobile --base /sard/mobile/',
    {
      cwd: resolve(process.cwd(), '../sard-uniapp-demo'),
    },
  )
}
