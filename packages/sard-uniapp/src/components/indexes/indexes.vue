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
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  matchScrollVisible,
  type NodeRect,
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

watch(
  () => props.current,
  () => {
    if (
      !isNullish(props.current) &&
      anchorNames.value.includes(props.current)
    ) {
      innerCurrent.value = props.current
      scrollTo(props.current)
    }
  },
)

// scroll
const instance = getCurrentInstance()
const scrollViewId = uniqid()
const scrollViewRect = ref<NodeRect>()
const scrollTop = ref<number | undefined>(0)
const memoScrollTop = ref(0)
let lockScroll = false

const [unLockScrollLater] = useSetTimeout(() => {
  lockScroll = false
})

const scrollTo = (name: string | number) => {
  if (!scrollViewRect.value) {
    return
  }
  lockScroll = true
  unLockScrollLater(150)
  const item = anchorRectList.value.find((item) => item[0] === name)
  if (item) {
    const offset = item[1].top - scrollViewRect.value.top
    scrollTop.value = undefined
    nextTick(() => {
      scrollTop.value = offset
    })
  }
}

defineExpose<IndexesExpose>({
  scrollTo,
})

const onScroll = (event: any) => {
  memoScrollTop.value = event.detail.scrollTop

  if (lockScroll || !scrollViewRect.value) {
    return
  }
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
      offset: scrollViewRect.value.top + memoScrollTop.value,
    },
  )
}

onMounted(() => {
  getBoundingClientRect(`#${scrollViewId}`, instance).then((rect) => {
    scrollViewRect.value = rect
  })
})

// anchor
const anchorRectList = ref<[string | number, NodeRect][]>([])

const anchorMap = ref<
  Record<string, Parameters<IndexesContext['register']>[1]>
>({})

provide<IndexesContext>(indexesContextSymbol, {
  register(name, expose) {
    anchorMap.value[name] = expose
  },
  unregister(name) {
    delete anchorMap.value[name]
  },
})

const getAllAnchorRect = async () => {
  const allRect = await Promise.all(
    Object.keys(anchorMap.value).map((name) => {
      const { getRect } = anchorMap.value[name]
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

onMounted(() => {
  nextTick(() => {
    getAllAnchorRect().then((rect) => {
      anchorRectList.value = rect
      if (!isNullish(props.current)) {
        scrollTo(props.current)
      }
    })
  })
})

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
</script>

<style lang="scss">
@import './index.scss';
</style>
