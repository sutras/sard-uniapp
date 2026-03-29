import * as ghpages from 'gh-pages'
import consola from 'consola'
import inquirer from 'inquirer'
import { gitRepositories, docsOutDir } from './config'

interface Remote {
  name: string
  branch: string
  docsRepo: string
}

const remotes = gitRepositories.map((item) => {
  return {
    ...item,
  }
})

function getRemoteConfigs(remote: string) {
  if (remote === 'all') {
    return remotes
  } else {
    return [remotes.find((item) => item.name === remote)!]
  }
}

async function doDeploy(config: Remote) {
  return new Promise<void>((resolve, reject) => {
    consola.start(`[${config.name}] (${config.docsRepo}) 开始部署...`)
    ghpages.publish(
      docsOutDir,
      {
        branch: config.branch,
        repo: config.docsRepo,
      },
      (err) => {
        if (err) {
          reject(err)
        } else {
          consola.success(`[${config.name}] (${config.docsRepo}) 部署成功`)
          resolve()
        }
      },
    )
  })
}

async function deploy() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'remote',
      message: '选择部署到哪个远程仓库？',
      choices: [
        {
          name: 'all',
          value: 'all',
        },
        ...gitRepositories.map((item) => {
          return {
            name: item.name,
            value: item.name,
          }
        }),
      ],
    },
  ])

  const configs = getRemoteConfigs(answers.remote)

  try {
    for (const config of configs) {
      await doDeploy(config)
    }
  } catch (err) {
    consola.error(err)
  }
}

deploy()
