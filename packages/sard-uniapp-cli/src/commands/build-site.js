import { build } from 'vite'
import consola from 'consola'
import mergeViteConfig from '../utils/mergeViteConfig.js'
import { buildSiteMobile } from './build-site-mobile.js'

export async function buildSite() {
  try {
    await build(mergeViteConfig())
    const child = buildSiteMobile()
    consola.success('已完成文档的构建')
    consola.info('开始构建案例...')
    child.stdout.on('data', (data) => {
      console.log(data)
    })
    child.on('close', () => {
      consola.success('构建完成')
    })
  } catch (err) {
    consola.error('构建失败')
    console.log(err)
  }
}
