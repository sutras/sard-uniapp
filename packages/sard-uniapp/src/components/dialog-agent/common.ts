import { type DialogProps } from '../dialog/common'
import { defaultConfig } from '../config'

export interface DialogAgentProps extends DialogProps {
  id?: string
}

export const dialogAgentPropsDefaults = {
  ...defaultConfig.dialog,
  ...defaultConfig.dialogAgent,
}

export const mapIdImperative: Record<
  string,
  {
    show(props: Record<string, any>): void
    hide(): void
  }
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

  const { id = 'dialog' } = options

  const imperative = mapIdImperative[id]

  if (imperative) {
    imperative.show(options)
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

const hide = (id = 'dialog') => {
  const imperative = mapIdImperative[id]
  if (imperative) {
    imperative.hide()
  }
}
const hideAll = () => {
  Object.keys(mapIdImperative).forEach(hide)
}

dialog.alert = alert
dialog.confirm = confirm
dialog.hide = hide
dialog.hideAll = hideAll

export { dialog }
