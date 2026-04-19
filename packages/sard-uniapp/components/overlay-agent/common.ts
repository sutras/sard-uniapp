import { type OverlayProps, defaultOverlayProps } from '../overlay/common'
import { type DefaultProps, defaultConfig } from '../config'
import {
  getAllImperatives,
  getAvailableImperative,
  getImperatives,
} from '../../use'
import {
  type TransitionHookCallbacks,
  type TransitionHookEmits,
} from '../popup/common'

export interface OverlayAgentProps
  extends OverlayProps, TransitionHookCallbacks {
  id?: string
  onClick?: () => void
}

export const defaultOverlayAgentProps =
  (): DefaultProps<OverlayAgentProps> => ({
    ...defaultOverlayProps(),
    id: 'overlay',
    ...defaultConfig.overlayAgent,
  })

export interface OverlayAgentEmits extends TransitionHookEmits {
  (e: 'click', event: any): void
  (e: 'update:visible', visible: boolean): void
}

export const imperativeName = 'overlay'

export interface OverlayImperative {
  show(newProps: Record<string, any>): void
  hide(): void
}

export type OverlayOptions = OverlayAgentProps

export type OverlayFunction = ((options: OverlayOptions) => void) & {
  hide: (id?: string) => void
  hideAll: () => void
}

const show = (options: OverlayOptions) => {
  const { id = defaultOverlayAgentProps().id as string } = options

  const imperative = getAvailableImperative<OverlayImperative>(
    imperativeName,
    id,
  )
  if (imperative) {
    imperative.show(options)
  }
}

const overlay: OverlayFunction = (options: OverlayOptions) => {
  show(options)
}

const hide = (id = defaultOverlayAgentProps().id as string) => {
  const imperatives = getImperatives<OverlayImperative>(imperativeName, id)
  if (imperatives && imperatives.length > 0) {
    imperatives.forEach((item) => {
      item.imperative.hide()
    })
  }
}

const hideAll = () => {
  const mapImperatives = getAllImperatives<OverlayImperative>()[imperativeName]
  if (mapImperatives) {
    Object.keys(mapImperatives).forEach(hide)
  }
}

overlay.hide = hide
overlay.hideAll = hideAll

export { overlay }
