import nodePath from 'node:path'
import { normalizePath } from 'vite'
import {
  DEFAULT_README_NAME,
  MD_PATH_R,
  CWD,
  ROUTER_PATH_R,
  sardConfig,
  SARD_CONFIG_FILENAME,
} from '../utils/constants.js'

function deepMapRoutes(routes) {
  function recurse(routes, parentPath) {
    return (
      '[' +
      routes
        .map(({ path, filePath, children, title, index, type, hidden }) => {
          if (filePath && !MD_PATH_R.test(filePath)) {
            filePath = nodePath.resolve(CWD, filePath, DEFAULT_README_NAME)
          }

          if (filePath) {
            filePath = normalizePath(nodePath.resolve(CWD, filePath))
          }

          const currentPath = path.startsWith('/')
            ? path
            : (parentPath + '/' + path).replace(/\/+/, '/')

          const redirectPath = index
            ? index.startsWith('/')
              ? index
              : (
                  (type === 'group' ? parentPath : currentPath) +
                  '/' +
                  index
                ).replace(/\/+/, '/')
            : ''

          return `{
            path: '${currentPath}',
            component: ${filePath ? `() => import('${filePath}')` : `Trunking`},
            ${index ? `redirect: '${redirectPath}',` : ''}
            children: ${
              Array.isArray(children)
                ? recurse(children, type === 'group' ? parentPath : currentPath)
                : null
            },
            meta: { title: '${title}', type: '${type || ''}', hidden: ${
            hidden ? 'true' : 'false'
          } }
          }`
        })
        .join(',') +
      ']'
    )
  }

  return recurse(routes, '')
}

async function transform(id) {
  if (!ROUTER_PATH_R.test(id) && !id.includes(SARD_CONFIG_FILENAME)) {
    return
  }

  const {
    site: { routes },
  } = sardConfig

  const routesStr = deepMapRoutes(routes)

  const code = `import { createRouter, createWebHashHistory } from "vue-router"
import BasicLayout from '@@/components/layout/BasicLayout.vue'
import Trunking from '@@/components/layout/Trunking.vue'

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

export function VitePluginRouter() {
  return {
    name: 'VitePluginRouter',
    enforce: 'pre',
    transform(_, id) {
      return transform(id)
    },
  }
}
