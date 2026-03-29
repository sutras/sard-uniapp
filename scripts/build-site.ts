import consola from 'consola'
import child_process from 'node:child_process'
import {
  docsBase,
  docsMobileBase,
  docsMobileOutDir,
  docsOutDir,
  docsRelativeDir,
} from './config'

async function buildSite() {
  await new Promise<void>((resolve, reject) => {
    consola.info('开始构建文档...')

    child_process
      .spawn(
        'vitepress',
        [
          'build',
          docsRelativeDir,
          '--base',
          `/${docsBase}/`,
          '--outDir',
          docsOutDir,
        ],
        {
          shell: true,
          stdio: 'inherit',
        },
      )
      .on('exit', (code) => {
        if (code === 0) {
          consola.success('文档构建成功')
          consola.info('开始构建案例...')
          child_process
            .spawn(
              'uni',
              [
                'build',
                '-p',
                'h5',
                '--outDir',
                docsMobileOutDir,
                '--base',
                docsMobileBase,
              ],
              {
                shell: true,
                stdio: 'inherit',
              },
            )
            .on('exit', (code) => {
              if (code === 0) {
                consola.success('案例构建成功')
                resolve()
              } else {
                reject(new Error(`构建案例失败，退出码 ${code}`))
              }
            })
        } else {
          reject(new Error(`构建文档失败，退出码 ${code}`))
        }
      })
  })
}

buildSite()
