import {
  computed,
  MaybeRefOrGetter,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toValue,
  watch,
} from 'vue'
import { isApp, uniqid } from '../utils'

const popupStack = ref<string[]>([])

const pagesPopupStack = reactive<Record<string, string[]>>({})

export function useTopPopup(
  visible: MaybeRefOrGetter<boolean>,
  disabled?: MaybeRefOrGetter<boolean>,
  callback?: () => void,
) {
  const uid = uniqid()

  const isDisabled = computed(() => toValue(disabled))

  const pages = getCurrentPages()

  const currentPath = pages[pages.length - 1].route as string
  if (!pagesPopupStack[currentPath]) {
    pagesPopupStack[currentPath] = []
  }

  const add = () => {
    if (!popupStack.value.includes(uid)) {
      popupStack.value.push(uid)
    }

    if (!pagesPopupStack[currentPath].includes(uid)) {
      pagesPopupStack[currentPath].push(uid)
    }
  }

  const remove = () => {
    const index = popupStack.value.indexOf(uid)
    if (index !== -1) {
      popupStack.value.splice(index, 1)
    }

    const pIndex = pagesPopupStack[currentPath].indexOf(uid)
    if (pIndex !== -1) {
      pagesPopupStack[currentPath].splice(pIndex, 1)
    }
  }

  watch(
    () => toValue(visible),
    (visible) => {
      if (isDisabled.value) return

      if (visible) {
        add()
      } else {
        remove()
      }
    },
    {
      immediate: true,
    },
  )

  const hidePopup = () => {
    if (!isDisabled.value && toValue(visible) && isApp) {
      callback?.()
    }
  }

  onMounted(() => {
    uni.$on(uid, hidePopup)
  })

  onUnmounted(() => {
    remove()
    uni.$off(uid, hidePopup)
  })

  const isTopLayer = computed(() => {
    return popupStack.value[popupStack.value.length - 1] === uid
  })

  return {
    isTopLayer,
  }
}

export function usePageTopPopup() {
  const pages = getCurrentPages()
  const currentPath = pages[pages.length - 1].route as string

  if (!pagesPopupStack[currentPath]) {
    pagesPopupStack[currentPath] = []
  }

  const shouldStopBack = computed(() => {
    return pagesPopupStack[currentPath].length > 0
  })

  const hidePopup = () => {
    const popupStack = pagesPopupStack[currentPath]
    const uid = popupStack[popupStack.length - 1]
    if (uid) {
      uni.$emit(uid)
    }
  }

  return {
    shouldStopBack,
    hidePopup,
  }
}
