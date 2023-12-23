import child_process from 'child_process'
import consola from 'consola'
import path from 'path'
import { CWD } from '../utils/constants.js'

const npmRegistry = 'https://registry.npmjs.org/'

async function checkLogin() {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `npm whoami --registry ${npmRegistry} -ws=false`,
      (error, stdout) => {
        if (error) {
          reject(error)
        } else {
          resolve(stdout)
        }
      },
    )
  })
}

async function login() {
  return new Promise((resolve, reject) => {
    const child = child_process.spawn(`npm`, [
      'login',
      '--registry',
      npmRegistry,
      '-ws=false',
    ])

    process.stdin.pipe(child.stdin)

    child.stdout.on('data', (data) => {
      console.log(String(data))
      if (/Logged in/.test(data)) {
        resolve()
      }
    })

    child.stdout.on('error', (err) => {
      reject(err)
    })
  })
}

async function publish() {
  return new Promise(() => {
    child_process.spawn(
      `npm`,
      ['publish', '--access', 'public', '--registry', npmRegistry, '-ws=false'],
      {
        stdio: 'inherit',
        cwd: path.resolve(CWD, 'dist'),
      },
    )
  })
}

export async function release() {
  try {
    consola.start('检查npm登录状态')
    await checkLogin()
    consola.success('已登录npm')
  } catch (err) {
    if (!/code ENEEDAUTH/.test(String(err))) {
      consola.error(err)
      return
    }

    consola.info('请先登录npm')
    await login()
    consola.success('登录成功')
  }

  consola.start('正在发布')
  await publish()
}
