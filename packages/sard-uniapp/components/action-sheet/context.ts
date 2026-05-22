import {
  provide,
  inject,
  type InjectionKey,
  ref,
  onMounted,
  onUnmounted,
} from 'vue'
import { type ActionSheetItemProps } from '../action-sheet-item'

export interface ActionSheetContext {
  onItemSelect: (item: ActionSheetItemProps) => void
  registerItem: (item: ActionSheetItemProps) => number
  unregisterItem: (item: ActionSheetItemProps) => void
}

export const actionSheetContextKey: InjectionKey<ActionSheetContext> =
  Symbol('ActionSheetContext')

export function useActionSheet() {
  const context = inject(actionSheetContextKey)
  if (!context) {
    console.warn(
      '[SardUI] ActionSheetItem must be used within an ActionSheet component',
    )
  }
  return context
}

export function provideActionSheet(context: ActionSheetContext) {
  provide(actionSheetContextKey, context)
}

// 子组件使用的 composable
export function useActionSheetItem(item: ActionSheetItemProps) {
  const context = useActionSheet()
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
