import { computed, ref, shallowRef } from 'vue'
import { useTimeout } from './useTimeout'
import { isNullish, matchScrollVisible, type NodeRect } from '../utils'

export interface UseScrollSpyOptions {
  defaultCurrent?: string | number
  getSpiedRect: () => Promise<NodeRect>
  initialScroll?: boolean
  startOffset?: number
  onChange?: (name: string | number) => void
}

export function useScrollSpy(options: UseScrollSpyOptions) {
  const { defaultCurrent, initialScroll, onChange, getSpiedRect } = options

  const startOffset = computed(() => options.startOffset || 0)

  let memoScrollTop = 0

  const scrollTop = ref<number | undefined>(0)

  const innerCurrent = ref<number | string | undefined>(defaultCurrent)

  const anchorRectList = shallowRef<[string | number, NodeRect][]>([])

  const anchorMap = new Map<string | number, () => Promise<NodeRect>>()

  let lockScroll = false

  const { start: unLockScrollLater } = useTimeout(() => {
    lockScroll = false
  }, 150)

  const register = (
    name: string | number,
    getRect: () => Promise<NodeRect>,
  ) => {
    anchorMap.set(name, getRect)
  }

  const unregister = (name: string | number) => {
    anchorMap.delete(name)
  }

  const calcPosition = (offset: number) => {
    matchScrollVisible(
      anchorRectList.value.map((item) => item[1]),
      (index) => {
        const name = anchorRectList.value[index][0]
        if (name !== innerCurrent.value) {
          innerCurrent.value = name
          onChange?.(name)
        }
      },
      {
        offset,
      },
    )
  }

  const onScroll = (event: any) => {
    memoScrollTop = event.detail.scrollTop
    if (lockScroll) {
      return
    }
    calcPosition(memoScrollTop + startOffset.value)
  }

  const scrollTo = (name: string | number) => {
    if (anchorRectList.value.length > 0) {
      const item = anchorRectList.value.find((item) => item[0] === name)
      if (item) {
        const offset = item[1].top
        scrollTop.value = offset - startOffset.value

        lockScroll = true
        unLockScrollLater()
      }
    }
  }

  const getAllAnchorRect = async () => {
    const allRect = await Promise.all(
      [...anchorMap].map(([name, getRect]) => {
        return new Promise<[string | number, NodeRect]>((resolve) => {
          getRect().then((rect) => {
            resolve([name, rect])
          })
        })
      }),
    )
    return allRect.sort((a, b) => {
      return a[1].top - b[1].top
    })
  }

  const calcRect = async () => {
    const spiedRect = await getSpiedRect()

    anchorRectList.value = (await getAllAnchorRect()).map(([name, rect]) => {
      return [
        name,
        {
          ...rect,
          top: rect.top - spiedRect.top + memoScrollTop,
          bottom: rect.bottom - spiedRect.top + memoScrollTop,
        },
      ]
    })
  }

  const update = async () => {
    await calcRect()
  }

  const initialize = async () => {
    await calcRect()

    if (isNullish(innerCurrent.value)) {
      innerCurrent.value = anchorRectList.value[0]?.[0]
    }
    if (initialScroll) {
      scrollTo(innerCurrent.value)
    }
  }

  return {
    scrollTop,
    innerCurrent,
    anchorRectList,
    register,
    unregister,
    onScroll,
    scrollTo,
    update,
    initialize,
  }
}
