import { resolve } from 'node:path'
import { normalizePath } from 'vite'
import {
  DEFAULT_README_NAME,
  MD_PATH_R,
  CWD,
  ROUTER_PATH_R,
  sardConfig,
} from '../utils/constants.js'

function deepMapRoutes(routes) {
  function recurse(routes) {
    return (
      '[' +
      routes
        .map((route) => {
          return route.type === 'group' ? route.items : route
        })
        .flat()
        .map(({ path, filePath, children, index }) => {
          if (filePath && !MD_PATH_R.test(filePath)) {
            filePath = resolve(filePath, DEFAULT_README_NAME)
          }

          if (filePath) {
            filePath = normalizePath(resolve(CWD, filePath))
          }

          return `{
            path: '${path}',
            component: ${filePath ? `() => import('${filePath}')` : `Trunking`},
            ${index ? `redirect: (to) => to.path + '/' + '${index}',` : ''}
            children: ${Array.isArray(children) ? recurse(children) : null},
          }`
        })
        .join(',') +
      ']'
    )
  }

  return recurse(routes)
}

async function transform(id) {
  if (!ROUTER_PATH_R.test(id)) {
    return
  }

  const {
    site: { routes },
  } = sardConfig

  const routesStr = deepMapRoutes(routes)

  const code = `import { createRouter, createWebHashHistory } from "vue-router"
import BasicLayout from './components/BasicLayout.vue'
import Trunking from './components/Trunking.vue'

const router = createRouter({
  history: createWebHashHistory(),
	routes: [
    {
      path: '/',
      component: BasicLayout,
      children: ${routesStr}
    }
  ]
})

export default router`

  return code
}

export function transformRouter() {
  return {
    name: 'transformRouter',
    enforce: 'pre',
    transform(_, id) {
      return transform(id)
    },
  }
}
