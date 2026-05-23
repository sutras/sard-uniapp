import {
  type InjectionKey,
  provide,
  inject,
  onMounted,
  onUnmounted,
  useAttrs,
  Ref,
  ref,
} from 'vue'
import type { ShareSheetItemProps } from '../share-sheet-item/common'
import { reactiveComputed } from '../../use'

export interface ShareSheetContext {
  select: (item: ShareSheetItemProps) => void
  addItem: (item: ShareSheetItemProps) => void
  removeItem: (item: ShareSheetItemProps) => void
}

export const shareSheetContextKey = Symbol(
  'ShareSheetContext',
) as InjectionKey<ShareSheetContext>

export function provideShareSheet(context: ShareSheetContext) {
  provide(shareSheetContextKey, context)
}

export interface UseShareSheetReturn {
  items: Ref<ShareSheetItemProps[]>
  setSelectCallback: (
    callback: (item: ShareSheetItemProps, index: number) => void,
  ) => void
}

export function useShareSheet(): UseShareSheetReturn {
  const items = ref<ShareSheetItemProps[]>([])

  let selectCallback:
    | ((item: ShareSheetItemProps, index: number) => void)
    | null = null

  const setSelectCallback = (
    callback: (item: ShareSheetItemProps, index: number) => void,
  ) => {
    selectCallback = callback
  }

  provide<ShareSheetContext>(shareSheetContextKey, {
    select: (item) => {
      const index = items.value.indexOf(item)
      selectCallback?.(item, index)
    },
    addItem: (item) => {
      if (!items.value.includes(item)) {
        items.value.push(item)
      }
    },
    removeItem: (item) => {
      const index = items.value.indexOf(item)
      if (index > -1) {
        items.value.splice(index, 1)
      }
    },
  })

  return {
    items,
    setSelectCallback,
  }
}

export function useShareSheetItem(item: ShareSheetItemProps) {
  const context = inject(shareSheetContextKey)
  if (!context) {
    throw new Error('ShareSheetItem must be included in ShareSheet.')
  }

  const attrs = useAttrs()

  const mergedItem = reactiveComputed(() => {
    return {
      ...item,
      ...attrs,
    }
  })

  onMounted(() => {
    context.addItem(mergedItem)
  })

  onUnmounted(() => {
    context.removeItem(mergedItem)
  })

  return {
    select: () => {
      context.select(mergedItem)
    },
  }
}
