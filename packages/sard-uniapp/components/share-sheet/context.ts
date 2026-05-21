import {
  provide,
  inject,
  type InjectionKey,
  ref,
  onMounted,
  onUnmounted,
} from 'vue'
import type { ShareSheetItemProps } from '../share-sheet-item/common'

export interface ShareSheetContext {
  onItemSelect: (item: ShareSheetItemProps) => void
  registerItem: (item: ShareSheetItemProps) => number
  unregisterItem: (item: ShareSheetItemProps) => void
}

export const shareSheetContextKey: InjectionKey<ShareSheetContext> =
  Symbol('ShareSheetContext')

export function useShareSheet() {
  const context = inject(shareSheetContextKey)
  if (!context) {
    console.warn(
      '[SardUI] ShareSheetItem must be used within an ShareSheet component',
    )
  }
  return context
}

export function provideShareSheet(context: ShareSheetContext) {
  provide(shareSheetContextKey, context)
}

export function useShareSheetItem(item: ShareSheetItemProps) {
  const context = useShareSheet()
  const index = ref(-1)

  if (context) {
    onMounted(() => {
      index.value = context.registerItem(item)
    })
    onUnmounted(() => {
      context.unregisterItem(item)
    })
  }

  return {
    index,
    context,
    onItemSelect: () => {
      if (context && index.value >= 0) {
        context.onItemSelect(item)
      }
    },
  }
}
