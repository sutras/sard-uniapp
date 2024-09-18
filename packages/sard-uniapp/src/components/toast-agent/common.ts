import {
  getAllImperatives,
  getAvailableImperative,
  getImperatives,
} from '../../use/useImperative'
import { defaultConfig } from '../config'
import { type ToastProps, defaultToastProps } from '../toast/common'

export interface ToastAgentProps extends ToastProps {
  id?: string
}

export const defaultToastAgentProps = {
  ...defaultToastProps,
  ...defaultConfig.toastAgent,
}

export const imperativeName = 'toast'

export interface ToastImperative {
  show(newProps: Record<string, any>): void
  hide(): void
}

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

  const imperative = getAvailableImperative<ToastImperative>(imperativeName, id)
  if (imperative) {
    imperative.show(options)
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
  const imperatives = getImperatives<ToastImperative>(imperativeName, id)
  if (imperatives && imperatives.length > 0) {
    imperatives.forEach((item) => {
      item.imperative.hide()
    })
  }
}
const hideAll = () => {
  const mapImperatives = getAllImperatives<ToastImperative>()[imperativeName]
  if (mapImperatives) {
    Object.keys(mapImperatives).forEach(hide)
  }
}

toast.success = success
toast.fail = fail
toast.loading = loading
toast.hide = hide
toast.hideAll = hideAll

export { toast }
