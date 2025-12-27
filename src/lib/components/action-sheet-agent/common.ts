import {
  type ActionSheetProps,
  type ActionSheetEmits,
  type ActionSheetItem,
  defaultActionSheetProps,
} from '../action-sheet/common'
import { defaultConfig } from '../config'
import {
  getAllImperatives,
  getAvailableImperative,
  getImperatives,
} from '../../use'
import { type TransitionHookCallbacks } from '../popup/common'

export interface ActionSheetAgentProps
  extends ActionSheetProps,
    TransitionHookCallbacks {
  id?: string
  onClose?: () => void
  onCancel?: () => void
  onSelect?: (item: ActionSheetItem, index: number) => void
}

export const defaultActionSheetAgentProps = () => ({
  ...defaultActionSheetProps,
  ...defaultConfig.actionSheetAgent,
})

export interface ActionSheetAgentEmits extends ActionSheetEmits {}

export const imperativeName = 'actionSheet'

export interface ActionSheetImperative {
  show(newProps: Record<string, any>): void
  hide(): void
}

export type ActionSheetOptions = ActionSheetAgentProps

export interface ActionSheetSimpleShowFunction {
  (options: ActionSheetOptions): void
}

export interface ActionSheetShowFunction {
  (options?: ActionSheetOptions): void
}

export type ActionSheetFunction = ActionSheetSimpleShowFunction & {
  hide: (id?: string) => void
  hideAll: () => void
}

const show: ActionSheetShowFunction = (options = {}) => {
  const { id = defaultConfig.actionSheetAgent.id as string } = options

  const imperative = getAvailableImperative<ActionSheetImperative>(
    imperativeName,
    id,
  )
  if (imperative) {
    imperative.show(options)
  }
}

const actionSheet: ActionSheetFunction = (options?: ActionSheetOptions) => {
  show(options)
}

const hide = (id = defaultConfig.actionSheetAgent.id as string) => {
  const imperatives = getImperatives<ActionSheetImperative>(imperativeName, id)
  if (imperatives && imperatives.length > 0) {
    imperatives.forEach((item) => {
      item.imperative.hide()
    })
  }
}
const hideAll = () => {
  const mapImperatives =
    getAllImperatives<ActionSheetImperative>()[imperativeName]
  if (mapImperatives) {
    Object.keys(mapImperatives).forEach(hide)
  }
}

actionSheet.hide = hide
actionSheet.hideAll = hideAll

export { actionSheet }
