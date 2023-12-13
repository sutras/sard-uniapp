#!/usr/bin/env node

import fse from 'fs-extra'
import { program } from 'commander'
import shell from 'shelljs'
import consola from 'consola'
import { resolve } from 'node:path'

import inquirer from 'inquirer'
import { ROOT_DIR } from './src/utils/constants.js'

process.sard = {
  name: 'sard',
}

const pkg = fse.readJSONSync(resolve(ROOT_DIR, 'package.json'))

program.version(pkg.version)

program
  .command('init')
  .description('创建项目')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          message: '请输入项目名称',
          name: 'name',
        },
      ])

      const name = answers.name

      consola.info(`项目名为: ${name}`)
      consola.info(`正在拷贝项目，请稍后`)

      await new Promise((resolve, reject) => {
        shell.exec(
          `git clone https://github.com/sutras/hello-world.git ${name}`,
          {
            silent: true,
          },
          (code, stdout, stderr) => {
            if (code !== 0) {
              reject(stderr)
            } else {
              resolve(null)
            }
          },
        )
      })

      shell.rm('-rf', `./${name}/.git`)
      shell.cd(`./${name}`)

      consola.success('克隆完成')
    } catch (err) {
      consola.error(err)

      consola.wrapAll()
      consola.fatal(err)
      consola.warn(err)
      consola.restoreAll()
    }
  })

program
  .command('dev')
  .alias('serve')
  .description('启动一个开发服务器')
  .action(async () => {
    const { dev } = await import('./src/commands/dev.js')
    dev()
  })

program
  .command('build:site')
  .description('构建文档站点')
  .action(async () => {
    const { buildSite } = await import('./src/commands/build-site.js')
    buildSite()
  })

program
  .command('preview')
  .description('预览构建的文档站点')
  .action(async () => {
    const { preview } = await import('./src/commands/preview.js')
    preview()
  })

program
  .command('build')
  .description('打包组件')
  .action(async () => {
    const { build } = await import('./src/commands/build.js')
    build()
  })

program
  .command('release')
  .description('发布组件库到npm')
  .action(async () => {
    const { release } = await import('./src/commands/release.js')
    release()
  })

program
  .command('deploy')
  .description('部署文档站点到 Github Page')
  .action(async () => {
    const { deploy } = await import('./src/commands/deploy.js')
    deploy()
  })

program.parse(process.argv)
