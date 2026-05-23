import {
  type InjectionKey,
  type Ref,
  provide,
  inject,
  onMounted,
  onUnmounted,
  useAttrs,
  ref,
} from 'vue'
import { type ActionSheetItemProps } from '../action-sheet-item/common'
import { reactiveComputed } from '../../use'

export interface ActionSheetContext {
  select: (item: ActionSheetItemProps) => void
  addItem: (item: ActionSheetItemProps) => void
  removeItem: (item: ActionSheetItemProps) => void
}

export const actionSheetContextKey = Symbol(
  'ActionSheetContext',
) as InjectionKey<ActionSheetContext>

export interface UseActionSheetReturn {
  items: Ref<ActionSheetItemProps[]>
  setSelectCallback: (
    callback: (item: ActionSheetItemProps, index: number) => void,
  ) => void
}

export function useActionSheet(): UseActionSheetReturn {
  const items = ref<ActionSheetItemProps[]>([])

  let selectCallback:
    | ((item: ActionSheetItemProps, index: number) => void)
    | null = null

  const setSelectCallback = (
    callback: (item: ActionSheetItemProps, index: number) => void,
  ) => {
    selectCallback = callback
  }

  provide<ActionSheetContext>(actionSheetContextKey, {
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

export function useActionSheetItem(item: ActionSheetItemProps) {
  const context = inject(actionSheetContextKey)
  if (!context) {
    throw new Error('ActionSheetItem must be included in ActionSheet.')
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
