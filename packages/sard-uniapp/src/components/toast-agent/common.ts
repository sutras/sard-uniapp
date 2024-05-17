import { defaultConfig } from '../config'
import { type ToastProps, toastPropsDefaults } from '../toast/common'

export interface ToastAgentProps extends ToastProps {
  id?: string
}

export const toastAgentPropsDefaults = {
  ...toastPropsDefaults,
  ...defaultConfig.toastAgent,
}

export const mapIdImperatives: Record<
  string,
  {
    show(props: Record<string, any>): void
    hide(): void
  }[]
> = {}

export type ToastOptions = ToastAgentProps

export interface ToastSimpleShowFunction {
  (options: ToastOptions): void
  (title?: string | number, options?: ToastOptions): void
}

export interface ToastShowFunction {
  (
    optionsOrTitle?: string | number | ToastOptions,
    options?: ToastOptions,
    internalType?: ToastOptions['type'],
  ): void
}

export type ToastFunction = ToastSimpleShowFunction & {
  success: ToastSimpleShowFunction
  fail: ToastSimpleShowFunction
  loading: ToastSimpleShowFunction
  hide: (id?: string) => void
  hideAll: () => void
}

const show: ToastShowFunction = (
  optionsOrTitle,
  options = {},
  internalType,
) => {
  if (optionsOrTitle && typeof optionsOrTitle === 'object') {
    options = optionsOrTitle as ToastOptions
  } else {
    options.title = optionsOrTitle as string
  }

  options.type = internalType

  const { id = defaultConfig.toastAgent.id } = options

  const imperatives = mapIdImperatives[id]

  if (imperatives && imperatives.length > 0) {
    imperatives[imperatives.length - 1].show(options)
  }
}

const toast: ToastFunction = (
  optionsOrTitle?: string | number | ToastOptions,
  options?: ToastOptions,
) => {
  show(optionsOrTitle, options, 'text')
}

const success: ToastSimpleShowFunction = (
  optionsOrTitle?: string | number | ToastOptions,
  options?: ToastOptions,
) => {
  show(optionsOrTitle, options, 'success')
}

const fail: ToastSimpleShowFunction = (
  optionsOrTitle?: string | number | ToastOptions,
  options?: ToastOptions,
) => {
  show(optionsOrTitle, options, 'fail')
}

const loading: ToastSimpleShowFunction = (
  optionsOrTitle?: string | number | ToastOptions,
  options?: ToastOptions,
) => {
  show(optionsOrTitle, options, 'loading')
}

const hide = (id = defaultConfig.toastAgent.id) => {
  const imperatives = mapIdImperatives[id]
  if (imperatives && imperatives.length > 0) {
    imperatives.forEach((imperative) => {
      imperative.hide()
    })
  }
}
const hideAll = () => {
  Object.keys(mapIdImperatives).forEach(hide)
}

toast.success = success
toast.fail = fail
toast.loading = loading
toast.hide = hide
toast.hideAll = hideAll

export { toast }
