import {
  type ShareSheetProps,
  type ShareSheetEmits,
  defaultShareSheetProps,
} from '../share-sheet/common'
import { type DefaultProps, defaultConfig } from '../config'
import {
  getAllImperatives,
  getAvailableImperative,
  getImperatives,
} from '../../use'
import { type TransitionHookCallbacks } from '../popup/common'
import type { ShareSheetItemProps } from '../share-sheet-item/common'

export interface ShareSheetAgentProps
  extends ShareSheetProps, TransitionHookCallbacks {
  id?: string
  onClose?: () => void
  onCancel?: () => void
  onSelect?: (item: ShareSheetItemProps) => void
}

export const defaultShareSheetAgentProps =
  (): DefaultProps<ShareSheetAgentProps> => ({
    ...defaultShareSheetProps(),
    id: 'shareSheet',
    ...defaultConfig.shareSheetAgent,
  })

export interface ShareSheetAgentEmits extends ShareSheetEmits {}

export const imperativeName = 'shareSheet'

export interface ShareSheetImperative {
  show(newProps: Record<string, any>): void
  hide(): void
}

export type ShareSheetOptions = ShareSheetAgentProps

export interface ShareSheetSimpleShowFunction {
  (options: ShareSheetOptions): void
}

export interface ShareSheetShowFunction {
  (options?: ShareSheetOptions): void
}

export type ShareSheetFunction = ShareSheetSimpleShowFunction & {
  hide: (id?: string) => void
  hideAll: () => void
}

const show: ShareSheetShowFunction = (options = {}) => {
  const { id = defaultShareSheetAgentProps().id as string } = options

  const imperative = getAvailableImperative<ShareSheetImperative>(
    imperativeName,
    id,
  )
  if (imperative) {
    imperative.show(options)
  }
}

const shareSheet: ShareSheetFunction = (options?: ShareSheetOptions) => {
  show(options)
}

const hide = (id = defaultShareSheetAgentProps().id as string) => {
  const imperatives = getImperatives<ShareSheetImperative>(imperativeName, id)
  if (imperatives && imperatives.length > 0) {
    imperatives.forEach((item) => {
      item.imperative.hide()
    })
  }
}
const hideAll = () => {
  const mapImperatives =
    getAllImperatives<ShareSheetImperative>()[imperativeName]
  if (mapImperatives) {
    Object.keys(mapImperatives).forEach(hide)
  }
}

shareSheet.hide = hide
shareSheet.hideAll = hideAll

export { shareSheet }
