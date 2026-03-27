import { computed, type MaybeRef, reactive, unref } from 'vue'
import { uniqid } from '../utils'

export function useKeyList<T>(list: MaybeRef<T[]>) {
  const keyMap = new WeakMap<any, string>()

  return computed(() => {
    return unref(list).map((item) => {
      const key = keyMap.get(item) || uniqid()
      keyMap.set(item, key)

      return reactive({
        data: item,
        key,
      })
    })
  })
}
