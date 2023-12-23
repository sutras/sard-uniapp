import * as ghpages from 'gh-pages'
import consola from 'consola'
import inquirer from 'inquirer'
import { sardConfig } from '../utils/constants.js'

const remotes = {
  github: {
    name: 'github',
    branch: 'gh-pages',
    repo: 'https://github.com/sutras/sard-uniapp-docs.git',
  },
  gitee: {
    name: 'gitee',
    branch: 'gh-pages',
    repo: 'https://gitee.com/sutras/sard-uniapp-docs.git',
    success() {
      consola.info(
        `需要到gitee后台手动更新: https://gitee.com/sutras/sard-uniapp-docs/pages`,
      )
    },
  },
}

function getRemoteConfigs(remote) {
  if (remote === 'both') {
    return [remotes.gitee, remotes.github]
  } else {
    return [remotes[remote]]
  }
}

async function doDeploy(config) {
  return new Promise((resolve, reject) => {
    consola.start(`[${config.name}] (${config.repo}) 开始部署...`)
    ghpages.publish(
      sardConfig.buildSite.outDir,
      {
        branch: config.branch,
        repo: config.repo,
      },
      (err) => {
        if (err) {
          reject(err)
        } else {
          consola.success(`[${config.name}] (${config.repo}) 部署成功`)
          resolve()
        }
      },
    )
  })
}

export async function deploy() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'remote',
      message: '选择部署到哪个远程仓库？',
      choices: [
        {
          name: 'both',
          value: 'both',
        },
        {
          name: 'github',
          value: 'github',
        },
        {
          name: 'gitee',
          value: 'gitee',
        },
      ],
    },
  ])

  const configs = getRemoteConfigs(answers.remote)

  try {
    for (let config of configs) {
      await doDeploy(config)
      config.success?.()
    }
  } catch (err) {
    consola.error(err)
  }
}
