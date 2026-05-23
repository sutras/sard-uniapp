import {
  type PopupProps,
  type PopupEmits,
  type PopupSlots,
  defaultPopupProps,
} from '../popup/common'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookCallbacks } from '../popup/common'
import {
  getAllImperatives,
  getAvailableImperative,
  getImperatives,
} from '../../use'

export interface PopupAgentProps extends PopupProps, TransitionHookCallbacks {
  id?: string
  onOverlayClick?: (event: any) => void
  onBackPress?: () => void
}

export const defaultPopupAgentProps = (): DefaultProps<PopupAgentProps> => ({
  ...defaultPopupProps(),
  id: 'popup',
  ...defaultConfig.popupAgent,
})

export interface PopupAgentEmits extends PopupEmits {}

export interface PopupAgentSlots extends PopupSlots {}

export const imperativeName = 'popup'

export interface PopupImperative {
  show(newProps: Record<string, any>): void
  hide(): void
}

export type PopupOptions = PopupAgentProps

export interface PopupShowFunction {
  (options?: PopupOptions): void
}

export type PopupFunction = PopupShowFunction & {
  hide: (id?: string) => void
  hideAll: () => void
}

const show: PopupShowFunction = (options = {}) => {
  const { id = defaultPopupAgentProps().id as string } = options

  const imperative = getAvailableImperative<PopupImperative>(imperativeName, id)
  if (imperative) {
    imperative.show(options)
  }
}

const popup: PopupFunction = (options?: PopupOptions) => {
  show(options)
}

const hide = (id = defaultPopupAgentProps().id as string) => {
  const imperatives = getImperatives<PopupImperative>(imperativeName, id)
  if (imperatives && imperatives.length > 0) {
    imperatives.forEach((item) => {
      item.imperative.hide()
    })
  }
}

const hideAll = () => {
  const mapImperatives = getAllImperatives<PopupImperative>()[imperativeName]
  if (mapImperatives) {
    Object.keys(mapImperatives).forEach(hide)
  }
}

popup.hide = hide
popup.hideAll = hideAll

export { popup }
