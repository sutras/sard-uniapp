import { URLQuery } from './url-query'

interface RouterExtraOptions {
  query?: Record<string, any>
}

interface Route {
  url: string
  query?: Record<string, any>
}

export interface PagesPath {}

type ChangeOptionsUrl<
  T extends {
    url: string.PageURIString
  },
> = Omit<T, 'url'> & {
  url:
    | (string & {})
    | PagesPath['path' extends keyof PagesPath ? 'path' : never]
}

type RouterGuard = (
  to: Route,
  from: Route,
) =>
  | boolean
  | undefined
  | null
  | void
  | string
  | Route
  | Promise<boolean | undefined | null | void | string | Route>

export class Router {
  status: 'idle' | 'busy' = 'idle'

  guards: RouterGuard[] = []

  protected resolvePath(currentPath: string, path: string) {
    if (/^\//.test(path)) {
      return path
    }
    const fragments = currentPath.replace(/\/[^/]+$/, '').split('/')
    if (path.startsWith('./')) {
      path = path.slice(2)
    }
    fragments.push(...path.split('/'))

    const count = fragments.filter((frag) => frag === '..').length

    for (let i = 0; i < count; i++) {
      const index = fragments.indexOf('..')
      fragments.splice(index - 1, 2)
    }

    return '/' + fragments.join('/')
  }

  protected parseQuery(url: string) {
    const [pathPart, queryPart] = url.split('?')
    const pathQuery: {
      url: string
      query?: Record<string, string>
    } = {
      url: pathPart,
    }

    if (queryPart) {
      pathQuery.query = Object.fromEntries(new URLQuery(queryPart))
    }
    return pathQuery
  }

  protected getPathQuery(currentPath: string, route: string | Route) {
    const toRoute =
      typeof route === 'string'
        ? this.parseQuery(route)
        : this.parseQuery(route.url)

    return {
      url: this.resolvePath(currentPath, toRoute.url),
      query: {
        ...toRoute.query,
        ...(typeof route !== 'string' ? route.query : null),
      },
    }
  }

  protected makeUniRouteOptions(
    to: {
      url: string
      query: Record<string, any>
    },
    options: any,
  ) {
    const url =
      to.url +
      (Object.keys(to.query).length > 0
        ? '?' + new URLQuery(Object.entries(to.query)).toString()
        : '')
    return {
      ...options,
      url,
    }
  }

  protected async intercept(
    options: {
      url: string
      success?: (result: any) => void
      fail?: (result: any) => void
      complete?: (result: any) => void
    } & RouterExtraOptions,
    action: (...args: any[]) => any,
  ) {
    if (this.status === 'busy') {
      return
    }
    this.status = 'busy'

    const complete = options.complete
    options.complete = (result) => {
      this.status = 'idle'
      complete?.(result)
    }

    const pages = getCurrentPages()
    const currentPath = pages[pages.length - 1].route as string

    const toPathQuery = this.getPathQuery(currentPath, {
      url: options.url,
      query: options.query,
    })

    const fromPathQuery = {
      url: '/' + currentPath,
      query: {},
    }

    try {
      for (const guard of this.guards) {
        const result = await guard(toPathQuery, fromPathQuery)
        if (result === false) {
          this.status = 'idle'
          return
        }

        if (typeof result === 'string') {
          return action(
            this.makeUniRouteOptions(
              this.getPathQuery(currentPath, result),
              options,
            ),
          )
        }

        if (result !== null && typeof result === 'object') {
          return action(
            this.makeUniRouteOptions(
              this.getPathQuery(currentPath, result),
              options,
            ),
          )
        }
      }
    } catch (err) {
      this.status = 'idle'
      console.error(err)
      return
    }

    return action(this.makeUniRouteOptions(toPathQuery, options))
  }

  navigateTo(
    options: ChangeOptionsUrl<UniApp.NavigateToOptions> & RouterExtraOptions,
  ) {
    return this.intercept(options, uni.navigateTo)
  }

  redirectTo(
    options: ChangeOptionsUrl<UniApp.RedirectToOptions> & RouterExtraOptions,
  ) {
    return this.intercept(options, uni.redirectTo)
  }

  reLaunch(
    options: ChangeOptionsUrl<UniApp.ReLaunchOptions> & RouterExtraOptions,
  ) {
    return this.intercept(options, uni.reLaunch)
  }

  switchTab(options: ChangeOptionsUrl<UniApp.SwitchTabOptions>) {
    return this.intercept(options, uni.switchTab)
  }

  navigateBack(options: UniApp.NavigateBackOptions) {
    return uni.navigateBack(options)
  }

  beforeEach(guard: RouterGuard) {
    if (!this.guards.includes(guard)) {
      this.guards.push(guard)
    }
  }
}
