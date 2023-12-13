import { reactive } from 'vue'
import { type App, provide, inject } from 'vue'

export interface ConfigProviderOptions {
  locale?: Record<string, any>
}

export interface ConfigProviderContext {
  locale?: Record<string, any>
}

export const configProviderContextSymbol = Symbol('config-provider-context')

export function ConfigProvider(
  app: App,
  options: ConfigProviderOptions = {},
): any {
  app.provide<ConfigProviderContext>(
    configProviderContextSymbol,
    reactive(options),
  )
}

export function useConfigProviderContext() {
  return inject<ConfigProviderContext | null>(configProviderContextSymbol, null)
}

export function useProvideConfigProviderContext(
  options: ConfigProviderOptions = {},
) {
  const context = useConfigProviderContext()
  provide<ConfigProviderContext>(
    configProviderContextSymbol,
    Object.assign({}, context, options),
  )
}
