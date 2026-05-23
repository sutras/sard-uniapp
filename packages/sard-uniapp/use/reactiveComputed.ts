import { computed, ComputedGetter, UnwrapNestedRefs } from 'vue'
import { toReactive } from './toReactive'

export type ReactiveComputedReturn<T extends object> = UnwrapNestedRefs<T>

export function reactiveComputed<T extends object>(
  fn: ComputedGetter<T>,
): ReactiveComputedReturn<T> {
  return toReactive<T>(computed<T>(fn))
}
