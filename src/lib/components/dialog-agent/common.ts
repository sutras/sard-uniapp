import {
  type DialogEmits,
  type DialogProps,
  defaultDialogProps,
} from '../dialog/common'
import { defaultConfig } from '../config'
import {
  getAllImperatives,
  getAvailableImperative,
  getImperatives,
} from '../../use'
import { type TransitionHookCallbacks } from '../popup/common'

export interface DialogAgentProps extends DialogProps, TransitionHookCallbacks {
  id?: string
  onClose?: () => void
  onCancel?: () => void
  onConfirm?: () => void
}

export const defaultDialogAgentProps = () => ({
  ...defaultDialogProps,
  ...defaultConfig.dialogAgent,
})

export interface DialogAgentEmits extends DialogEmits {}

export const imperativeName = 'dialog'

export interface DialogImperative {
  show(newProps: Record<string, any>): void
  hide(): void
}

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

  const { id = defaultConfig.dialogAgent.id as string } = options

  const imperative = getAvailableImperative<DialogImperative>(
    imperativeName,
    id,
  )
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

const hide = (id = defaultConfig.dialogAgent.id as string) => {
  const imperatives = getImperatives<DialogImperative>(imperativeName, id)
  if (imperatives && imperatives.length > 0) {
    imperatives.forEach((item) => {
      item.imperative.hide()
    })
  }
}
const hideAll = () => {
  const mapImperatives = getAllImperatives<DialogImperative>()[imperativeName]
  if (mapImperatives) {
    Object.keys(mapImperatives).forEach(hide)
  }
}

dialog.alert = alert
dialog.confirm = confirm
dialog.hide = hide
dialog.hideAll = hideAll

export { dialog }
