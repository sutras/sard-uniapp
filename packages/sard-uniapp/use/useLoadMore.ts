/**
 * 以 hook 的方式组织 LoadMore 的逻辑
 */

import { computed, type MaybeRefOrGetter, ref, toValue } from 'vue'
import { useIntersectionObserver } from './useIntersectionObserver'
import { type LoadMoreStatus } from '../components/load-more'
import { uniqid } from '../utils'

export interface UseLoadMoreOptions {
  request: (page: number, isRefresh: boolean) => Promise<boolean>
  marginBottom?: MaybeRefOrGetter<number>
  marginTop?: MaybeRefOrGetter<number>
  scrollViewSelector?: string
  disabled?: MaybeRefOrGetter<boolean>
}

export function useLoadMore(options: UseLoadMoreOptions) {
  const status = ref<LoadMoreStatus>('incomplete')
  const currentPage = ref(1)
  const loadMoreId = uniqid()
  const isRefresh = ref(false)
  const isIntersecting = ref(false)

  const disabled = computed(() => toValue(options.disabled))

  const { marginBottom = 100, marginTop, scrollViewSelector } = options

  let firstTime = false

  let currentPromise: Promise<void> | null = null

  const loadMoreFetch = async (page: number) => {
    if (status.value === 'loading') return currentPromise

    firstTime = true

    status.value = 'loading'

    currentPage.value = page

    return (currentPromise = options
      .request(page, isRefresh.value)
      .then((loaded) => {
        isRefresh.value = false
        status.value = loaded ? 'complete' : 'incomplete'

        if (!loaded) {
          setTimeout(() => {
            if (status.value === 'incomplete' && isIntersecting.value) {
              onLoadMore()
            }
          }, 30)
        }
      })
      .catch(() => {
        status.value = 'error'
      }))
  }

  const refresh = async () => {
    if (!disabled.value) {
      isRefresh.value = true
      return loadMoreFetch(1)
    }
  }

  const onLoadMore = () => {
    if (!disabled.value) {
      loadMoreFetch(currentPage.value + 1)
    }
  }

  const onReload = () => {
    if (!disabled.value) {
      loadMoreFetch(currentPage.value)
    }
  }

  useIntersectionObserver(
    (res) => {
      isIntersecting.value = res.intersectionRatio > 0

      if (
        !disabled.value &&
        status.value === 'incomplete' &&
        isIntersecting.value
      ) {
        loadMoreFetch(firstTime ? currentPage.value + 1 : currentPage.value)
      }
    },
    {
      root: scrollViewSelector,
      selector: `#${loadMoreId}`,
      marginBottom,
      marginTop,
      thresholds: [0],
      disabled,
    },
  )

  return {
    status,
    isLoading: computed(() => status.value === 'loading'),
    onLoadMore,
    onReload,
    currentPage,
    loadMoreId,
    refresh,
  }
}
