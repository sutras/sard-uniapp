import { type NotifyProps } from '../notify/common'
import { defaultConfig } from '../config'

export interface NotifyAgentProps extends NotifyProps {
  id?: string
}

export const notifyAgentPropsDefaults = {
  ...defaultConfig.notify,
  ...defaultConfig.notifyAgent,
}

export const mapIdImperative: Record<
  string,
  {
    show(props: Record<string, any>): void
    hide(): void
  }
> = {}

export type NotifyOptions = NotifyAgentProps

export interface NotifySimpleShowFunction {
  (options: NotifyOptions): void
  (message: string, options?: NotifyOptions): void
}

export interface NotifyShowFunction {
  (
    optionsOrMessage: string | NotifyOptions,
    options?: NotifyOptions,
    internalType?: NotifyOptions['type'],
  ): void
}

export type NotifyFunction = NotifySimpleShowFunction & {
  success: NotifySimpleShowFunction
  warning: NotifySimpleShowFunction
  error: NotifySimpleShowFunction
  hide: (id?: string) => void
  hideAll: () => void
}

const show: NotifyShowFunction = (
  optionsOrMessage,
  options = {},
  internalType,
) => {
  if (optionsOrMessage && typeof optionsOrMessage === 'object') {
    options = optionsOrMessage as NotifyOptions
  } else {
    options.message = optionsOrMessage as string
  }

  options.type = internalType

  const { id = 'notify' } = options

  const imperative = mapIdImperative[id]

  if (imperative) {
    imperative.show(options)
  }
}

const notify: NotifyFunction = (
  optionsOrMessage: NotifyOptions | string,
  options?: NotifyOptions,
) => {
  show(optionsOrMessage, options, 'primary')
}

const success: NotifySimpleShowFunction = (
  optionsOrMessage: NotifyOptions | string,
  options?: NotifyOptions,
) => {
  show(optionsOrMessage, options, 'success')
}

const warning: NotifySimpleShowFunction = (
  optionsOrMessage: NotifyOptions | string,
  options?: NotifyOptions,
) => {
  show(optionsOrMessage, options, 'warning')
}

const error: NotifySimpleShowFunction = (
  optionsOrMessage: NotifyOptions | string,
  options?: NotifyOptions,
) => {
  show(optionsOrMessage, options, 'error')
}

const hide = (id = 'notify') => {
  const imperative = mapIdImperative[id]
  if (imperative) {
    imperative.hide()
  }
}
const hideAll = () => {
  Object.keys(mapIdImperative).forEach(hide)
}

notify.success = success
notify.warning = warning
notify.error = error
notify.hide = hide
notify.hideAll = hideAll

export { notify }
