<template>
  <view :class="waterfallItemClass" :style="waterfallItemStyle">
    <slot :on-load="onLoad" :column-width="context.columnWidth"></slot>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  onBeforeUnmount,
  reactive,
  ref,
  watch,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import {
  type WaterfallItemProps,
  type WaterfallItemSlots,
  type WaterfallItemEmits,
  type WaterfallItemExpose,
  type WaterfallItemInfo,
} from './common'
import { waterfallContextKey } from '../waterfall/common'
import { useTimeout } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<WaterfallItemProps>(), {})

defineSlots<WaterfallItemSlots>()

defineEmits<WaterfallItemEmits>()

const bem = createBem('waterfall-item')

// main
const instance = getCurrentInstance()
const itemId = uniqid()

const item = reactive<WaterfallItemInfo>({
  loaded: false,
  visible: false,
  height: 0,
  top: 0,
  left: 0,
  beforeReflow: async () => {
    await updateHeight()
  },
})

const updateHeight = async () => {
  try {
    item.height = (await getBoundingClientRect(`.${itemId}`, instance)).height
  } catch {
    void 0
  }
}

const context = inject(waterfallContextKey)!

const onLoad = () => {
  if (!item.loaded) {
    item.loaded = true
    context.onItemLoad()
  }
}

onMounted(() => {
  context.addItem(item)
})

onBeforeUnmount(() => {
  context.removeItem(item)
})

// others

defineExpose<WaterfallItemExpose>({})

const waterfallItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('show', item.visible),
    itemId,
    props.rootClass,
  )
})

const laterVisible = ref(false)
const { start } = useTimeout(() => {
  laterVisible.value = true
}, 100)

watch(
  () => item.visible,
  () => {
    if (item.visible) {
      start()
    } else {
      laterVisible.value = false
    }
  },
)

const waterfallItemStyle = computed(() => {
  return stringifyStyle(
    {
      width: context.columnWidth + 'px',
      transform: `translate3d(${item.left}px,${item.top}px,0px)`,
      transition: laterVisible.value
        ? `opacity var(--sar-waterfall-duration),transform var(--sar-waterfall-duration)`
        : `opacity var(--sar-waterfall-duration)`,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
