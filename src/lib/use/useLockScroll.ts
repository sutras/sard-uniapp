import { onHide, onShow } from '@dcloudio/uni-app'
import {
  computed,
  type MaybeRefOrGetter,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toValue,
  watch,
} from 'vue'
import { isMp, isNumber } from '../utils'

const globalLockRecord = ref(0)

/**
 * 用于web端全局自动添加/删除阻止滚动的类名
 */
// #ifdef WEB
watch(globalLockRecord, (record) => {
  if (record > 0) {
    document.body.classList.add('sar-popup-hidden')
  } else {
    document.body.classList.remove('sar-popup-hidden')
  }
})
// #endif

const pagesRecord = reactive<Record<string, number>>({})

export function useLockScroll(
  _visible: MaybeRefOrGetter<boolean>,
  lockScroll = true,
) {
  if (!lockScroll) return

  const pages = getCurrentPages()
  const currentPath = pages[pages.length - 1].route as string
  if (!isNumber(pagesRecord[currentPath])) {
    pagesRecord[currentPath] = 0
  }

  const visible = computed(() => toValue(_visible))

  let isLocked = false

  const lock = () => {
    if (!isLocked) {
      isLocked = true
      globalLockRecord.value++
      pagesRecord[currentPath]++
    }
  }

  const unlock = () => {
    if (isLocked) {
      isLocked = false
      globalLockRecord.value--
      pagesRecord[currentPath]--
    }
  }

  onMounted(() => {
    if (visible.value) {
      lock()
    }
  })

  onBeforeUnmount(() => {
    unlock()
  })

  onShow(() => {
    if (visible.value) {
      lock()
    }
  })

  onHide(() => {
    if (visible.value) {
      unlock()
    }
  })

  watch(visible, (visible) => {
    if (visible) {
      lock()
    } else {
      unlock()
    }
  })
}

/**
 * 用于小程序端判断 page-meta 是否应加上溢出隐藏
 */
export function useCurrentPageLock() {
  const pages = getCurrentPages()
  const currentPath = pages[pages.length - 1].route as string

  if (!isNumber(pagesRecord[currentPath])) {
    pagesRecord[currentPath] = 0
  }

  const isLocked = computed(() => {
    const record = pagesRecord[currentPath]
    return isMp && record > 0
  })

  return {
    isLocked,
  }
}
