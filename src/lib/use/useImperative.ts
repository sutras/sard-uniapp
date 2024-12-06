import { type Ref, onMounted, onUnmounted } from 'vue'
import { onHide, onShow } from '@dcloudio/uni-app'

type ImperativeItem<T = any> = { show: boolean; imperative: T }

type AllImperatives<T = any> = Record<
  string,
  Record<string, ImperativeItem<T>[] | undefined> | undefined
>

const allImperatives: AllImperatives = {}

export function useImperative<T = any>(
  name: string,
  imperative: T,
  id: Ref<string>,
) {
  onMounted(() => {
    if (id.value) {
      const imperativeItems = ((allImperatives[name] ??= {})[id.value] ??= [])
      const index = imperativeItems.findIndex(
        (item) => item.imperative === imperative,
      )
      if (index === -1) {
        imperativeItems.push({
          imperative,
          show: true,
        })
      }
    }
  })

  onUnmounted(() => {
    if (id.value) {
      const imperativeItems = allImperatives[name]?.[id.value]
      if (imperativeItems) {
        const index = imperativeItems.findIndex(
          (item) => item.imperative === imperative,
        )
        if (index !== -1) {
          imperativeItems.splice(index, 1)

          if (imperativeItems.length === 0) {
            delete allImperatives[name]?.[id.value]
          }
        }
      }
    }
  })

  onShow(() => {
    if (id.value) {
      const imperativeItems = allImperatives[name]?.[id.value]
      if (imperativeItems) {
        const imperativeItem = imperativeItems.find(
          (item) => item.imperative === imperative,
        )
        if (imperativeItem) {
          imperativeItem.show = true
        }
      }
    }
  })

  onHide(() => {
    if (id.value) {
      const imperativeItems = allImperatives[name]?.[id.value]
      if (imperativeItems) {
        const imperativeItem = imperativeItems.find(
          (item) => item.imperative === imperative,
        )
        if (imperativeItem) {
          imperativeItem.show = false
        }
      }
    }
  })
}

export function getAvailableImperative<T = any>(
  name: string,
  id: string,
): T | void {
  const imperativeItems = allImperatives[name]?.[id]
  if (imperativeItems) {
    for (let i = imperativeItems.length - 1; i >= 0; i--) {
      const imperativeItem = imperativeItems[i]
      if (imperativeItem.show) {
        return imperativeItem.imperative as T
      }
    }
  }
}

export function getImperatives<T = any>(
  name: string,
  id: string,
): ImperativeItem<T>[] | undefined {
  return allImperatives[name]?.[id]
}

export function getAllImperatives<T = any>(): AllImperatives<T> {
  return allImperatives
}
