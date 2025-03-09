<template>
  <view :class="indexesClass" :style="indexesStyle">
    <scroll-view
      :class="bem.e('scroll-view')"
      :id="scrollViewId"
      scroll-y
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <slot></slot>
    </scroll-view>
    <sar-indexes-nav
      :anchors="anchorNames"
      :current="innerCurrent"
      @select="onNavSelect"
    />
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  getCurrentInstance,
  ref,
  provide,
  watch,
  nextTick,
  shallowRef,
} from 'vue'
import {
  type NodeRect,
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  matchScrollVisible,
  isNullish,
} from '../../utils'
import {
  type IndexesProps,
  type IndexesSlots,
  type IndexesEmits,
  type IndexesContext,
  type IndexesExpose,
  indexesContextSymbol,
} from './common'
import { useSetTimeout } from '../../use'
import SarIndexesNav from '../indexes-nav/indexes-nav.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<IndexesProps>(), {})

defineSlots<IndexesSlots>()

const emit = defineEmits<IndexesEmits>()

const bem = createBem('indexes')

// main
const innerCurrent = ref(props.current)

// anchor
const anchorRectList = shallowRef<[string | number, NodeRect][]>([])

const anchorMap: Record<
  string | number,
  Parameters<IndexesContext['register']>[1]
> = {}

provide<IndexesContext>(indexesContextSymbol, {
  register(name, expose) {
    anchorMap[name] = expose
  },
  unregister(name) {
    delete anchorMap[name]
  },
})

const getAllAnchorRect = async () => {
  const allRect = await Promise.all(
    Object.keys(anchorMap).map((name) => {
      const { getRect } = anchorMap[name]
      return new Promise<[string | number, NodeRect]>((resolve) => {
        getRect().then((rect) => {
          resolve([name, rect])
        })
      })
    }),
  )
  const sortedAllRect = allRect.sort((a, b) => {
    return a[1].top - b[1].top
  })
  return sortedAllRect
}

const calcRect = async () => {
  const scrollViewRect = await getBoundingClientRect(
    `#${scrollViewId}`,
    instance,
  )

  anchorRectList.value = (await getAllAnchorRect()).map(([name, rect]) => {
    return [
      name,
      {
        ...rect,
        top: rect.top - scrollViewRect.top + memoScrollTop,
        bottom: rect.bottom - scrollViewRect.top + memoScrollTop,
      },
    ]
  })
}

const update = async () => {
  await calcRect()

  if (innerCurrent.value) {
    scrollTo(innerCurrent.value)
  }
}

const initialize = async () => {
  await calcRect()

  if (isNullish(innerCurrent.value)) {
    innerCurrent.value = anchorRectList.value[0][0]
  }
  scrollTo(innerCurrent.value)
}

onMounted(() => {
  initialize()
})

// scroll
const instance = getCurrentInstance()
const scrollViewId = uniqid()
const scrollTop = ref<number | undefined>(0)
let memoScrollTop = 0
let lockScroll = false

const [unLockScrollLater] = useSetTimeout(() => {
  lockScroll = false
})

const scrollTo = (name: string | number) => {
  if (anchorRectList.value.length > 0) {
    const item = anchorRectList.value.find((item) => item[0] === name)
    if (item) {
      const offset = item[1].top
      scrollTop.value = undefined
      nextTick(() => {
        scrollTop.value = offset
      })

      lockScroll = true
      unLockScrollLater(150)
    }
  }
}

const onScroll = (event: any) => {
  memoScrollTop = event.detail.scrollTop
  if (lockScroll) {
    return
  }
  calcPosition(memoScrollTop)
}

const calcPosition = (offset: number) => {
  matchScrollVisible(
    anchorRectList.value.map((item) => item[1]),
    (index) => {
      const name = anchorRectList.value[index][0]
      if (name !== innerCurrent.value) {
        innerCurrent.value = name
        emit('change', name)
      }
    },
    {
      offset,
    },
  )
}

// outside
watch(
  () => props.current,
  () => {
    if (
      !isNullish(props.current) &&
      anchorNames.value.includes(props.current) &&
      props.current !== innerCurrent.value
    ) {
      innerCurrent.value = props.current
      scrollTo(props.current)
    }
  },
)

// nav
const anchorNames = computed(() => {
  return anchorRectList.value.map((item) => item[0])
})

const onNavSelect = (name: string | number) => {
  innerCurrent.value = name
  scrollTo(name)
  emit('change', name)
}

// others
const indexesClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const indexesStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

defineExpose<IndexesExpose>({
  scrollTo,
  update,
})
</script>

<style lang="scss">
@import './index.scss';
</style>
