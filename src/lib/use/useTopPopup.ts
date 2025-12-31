import {
  computed,
  MaybeRefOrGetter,
  onUnmounted,
  ref,
  toValue,
  watch,
} from 'vue'
import { uniqid } from '../utils'

const popupStack = ref<string[]>([])

export function useTopPopup(
  visible: MaybeRefOrGetter<boolean>,
  disabled?: MaybeRefOrGetter<boolean>,
) {
  const uid = uniqid()

  const isDisabled = computed(() => toValue(disabled))

  const add = () => {
    if (!popupStack.value.includes(uid)) {
      popupStack.value.push(uid)
    }
  }

  const remove = () => {
    const index = popupStack.value.indexOf(uid)
    if (index !== -1) {
      popupStack.value.splice(index, 1)
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

  onUnmounted(() => {
    remove()
  })

  const isTopLayer = computed(() => {
    return popupStack.value[popupStack.value.length - 1] === uid
  })

  return {
    isTopLayer,
  }
}
