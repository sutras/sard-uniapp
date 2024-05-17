import { type DialogProps, dialogPropsDefaults } from '../dialog/common'
import { defaultConfig } from '../config'

export interface DialogAgentProps extends DialogProps {
  id?: string
}

export const dialogAgentPropsDefaults = {
  ...dialogPropsDefaults,
  ...defaultConfig.dialogAgent,
}

export const mapIdImperatives: Record<
  string,
  {
    show(props: Record<string, any>): void
    hide(): void
  }[]
> = {}

export type DialogOptions = DialogAgentProps

export interface DialogSimpleShowFunction {
  (options: DialogOptions): void
  (title: string, options?: DialogOptions): void
}

export interface DialogShowFunction {
  (
    optionsOrTitle: string | DialogOptions,
    options?: DialogOptions,
    internalOptions?: DialogOptions,
  ): void
}

export type DialogFunction = DialogSimpleShowFunction & {
  alert: DialogSimpleShowFunction
  confirm: DialogSimpleShowFunction
  hide: (id?: string) => void
  hideAll: () => void
}

const defaultDialogOptions = {
  headed: false,
  buttonType: 'text',
  showCancel: false,
}

const show: DialogShowFunction = (
  optionsOrTitle,
  options = {},
  internalOptions,
) => {
  if (optionsOrTitle && typeof optionsOrTitle === 'object') {
    options = optionsOrTitle as DialogOptions
  } else {
    options.title = optionsOrTitle as string
  }

  options = Object.assign({}, defaultDialogOptions, options, internalOptions)

  const { id = defaultConfig.dialogAgent.id } = options

  const imperatives = mapIdImperatives[id]

  if (imperatives && imperatives.length > 0) {
    imperatives[imperatives.length - 1].show(options)
  }
}

const dialog: DialogFunction = (
  optionsOrTitle: DialogOptions | string,
  options?: DialogOptions,
) => {
  show(optionsOrTitle, options, { showCancel: false })
}

const alert: DialogSimpleShowFunction = (
  optionsOrTitle: DialogOptions | string,
  options?: DialogOptions,
) => {
  show(optionsOrTitle, options, { showCancel: false })
}

const confirm: DialogSimpleShowFunction = (
  optionsOrTitle: DialogOptions | string,
  options?: DialogOptions,
) => {
  show(optionsOrTitle, options, {
    showCancel: true,
  })
}

const hide = (id = defaultConfig.dialogAgent.id) => {
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

dialog.alert = alert
dialog.confirm = confirm
dialog.hide = hide
dialog.hideAll = hideAll

export { dialog }
