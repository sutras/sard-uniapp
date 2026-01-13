<template>
  <view :class="waterfallClass" :style="waterfallStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
  throttle,
} from '../../utils'
import {
  type WaterfallProps,
  type WaterfallSlots,
  type WaterfallEmits,
  type WaterfallExpose,
  defaultWaterfallProps,
  waterfallContextKey,
} from './common'
import { type WaterfallItemInfo } from '../waterfall-item/common'
import { onShow } from '@dcloudio/uni-app'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<WaterfallProps>(), defaultWaterfallProps)

defineSlots<WaterfallSlots>()

const emit = defineEmits<WaterfallEmits>()

const bem = createBem('waterfall')

// main

// size
const containerId = uniqid()
const instance = getCurrentInstance()

const containerWidth = ref(0)
const containerHeight = ref(0)

const columnWidth = computed(() => {
  return (
    (containerWidth.value - (props.columns - 1) * props.columnGap) /
    props.columns
  )
})

onMounted(async () => {
  containerWidth.value = (
    await getBoundingClientRect(`.${containerId}`, instance)
  ).width
})

// status
let loadStatus: 'idle' | 'busy' = 'idle'

let loadedHandlers: (() => void)[] = []

const onLoad = (handler: () => void) => {
  nextTick(() => {
    if (loadStatus === 'idle') {
      handler()
    } else {
      if (!loadedHandlers.includes(handler)) {
        loadedHandlers.push(handler)
      }
    }
  })
}

const updateLoadStatus = () => {
  const includeLoading = items.some((item) => !item.loaded)
  if (includeLoading) {
    if (loadStatus === 'idle') {
      loadStatus = 'busy'
      emit('loadstart')
    }
  } else {
    if (loadStatus === 'busy') {
      loadedHandlers.forEach((handler) => handler())
      loadedHandlers = []

      loadStatus = 'idle'
      emit('load')
    }
  }
}

// items
const items: WaterfallItemInfo[] = []

const addItem = (item: WaterfallItemInfo) => {
  if (!items.includes(item)) {
    items.push(item)
    reflow()
    updateLoadStatus()
  }
}

const removeItem = (item: WaterfallItemInfo) => {
  if (items.includes(item)) {
    items.splice(items.indexOf(item), 1)
    reflow()
    updateLoadStatus()
  }
}

const reflow = throttle(async () => {
  const columns = Array(props.columns)
    .fill(0)
    .map((_, index) => {
      return { colIndex: index, height: 0 }
    })

  for (const item of items) {
    if (!item.loaded) {
      break
    }
    columns.sort((a, b) => a.height - b.height)
    const minColumn = columns[0]

    if (!minColumn) break

    await item.beforeReflow()
    item.top = minColumn.height === 0 ? 0 : minColumn.height + props.rowGap
    item.left = (props.columnGap + columnWidth.value) * minColumn.colIndex
    item.visible = true
    minColumn.height = item.top + item.height
  }

  containerHeight.value = columns.sort((a, b) => b.height - a.height)[0].height
}, 50)

const onItemLoad = () => {
  reflow()
  updateLoadStatus()
}

watch([() => props.columns, () => props.columnGap, () => props.rowGap], () => {
  setTimeout(() => {
    reflow()
  }, 50)
})

onShow(() => {
  // #ifdef WEB
  reflow()
  // #endif
})

provide(
  waterfallContextKey,
  reactive({
    addItem,
    removeItem,
    onItemLoad,
    columnWidth: columnWidth,
  }),
)

// others
defineExpose<WaterfallExpose>({
  reflow,
  onLoad,
})

const waterfallClass = computed(() => {
  return classNames(bem.b(), containerId, props.rootClass)
})

const waterfallStyle = computed(() => {
  return stringifyStyle(
    {
      height: containerHeight.value + 'px',
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
