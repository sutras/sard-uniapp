<template>
  <view :class="scrollListClass" :style="scrollListStyle">
    <scroll-view
      scroll-x
      :class="bem.e('scroll-view')"
      :upper-threshold="upperThreshold"
      :lower-threshold="lowerThreshold"
      @scroll="onScroll"
      @scrolltoupper="onScrolltoupper"
      @scrolltolower="onScrolltolower"
    >
      <view :id="contentId" :class="bem.e('content')">
        <slot></slot>
      </view>
    </scroll-view>
    <view :class="bem.e('scrollbar')" :style="scrollbarStyle">
      <view :class="bem.e('scrollbar-thumb')" :style="thumbStyle"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import {
  type ScrollListProps,
  type ScrollListSlots,
  type ScrollListEmits,
  type ScrollListExpose,
  defaultScrollListProps,
} from './common'
import { useWindowResize } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<ScrollListProps>(),
  defaultScrollListProps,
)

defineSlots<ScrollListSlots>()

const emit = defineEmits<ScrollListEmits>()

const bem = createBem('scroll-list')

// main
const scrollListId = uniqid()
const contentId = uniqid()
const instance = getCurrentInstance()

const scrollLeft = ref(0)
const scrollWidth = ref(0)
const clientWidth = ref(0)

const update = async () => {
  const scrollListRect = await getBoundingClientRect(
    `.${scrollListId}`,
    instance,
  )

  clientWidth.value = scrollListRect.width

  if (props.mode === 'traditional') {
    const contentRect = await getBoundingClientRect(`#${contentId}`, instance)

    scrollWidth.value = contentRect.width
  }
}

onMounted(async () => {
  update()
})

useWindowResize(update)

const onScroll = (event: any) => {
  scrollLeft.value = event.detail.scrollLeft
  scrollWidth.value = event.detail.scrollWidth

  emit('scroll', event)
}

const onScrolltoupper = (event: any) => {
  emit('scrolltoupper', event)
}

const onScrolltolower = (event: any) => {
  emit('scrolltolower', event)
}

defineExpose<ScrollListExpose>({ update })

// others
const scrollListClass = computed(() => {
  return classNames(bem.b(), scrollListId, props.rootClass)
})

const scrollListStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const scrollbarStyle = computed(() => {
  if (props.mode === 'traditional') {
    return {
      backgroundColor: props.scrollbarBg,
    }
  }

  return {
    width: props.scrollbarWidth + 'px',
    backgroundColor: props.scrollbarBg,
  }
})

const thumbStyle = computed(() => {
  if (props.mode === 'traditional') {
    let left = scrollLeft.value / scrollWidth.value
    if (!Number.isFinite(left)) {
      left = 0
    }
    let width = clientWidth.value / scrollWidth.value
    if (!Number.isFinite(width)) {
      width = 0
    }
    return {
      left: left * 100 + '%',
      width: width * 100 + '%',
      backgroundColor: props.thumbBg,
    }
  } else {
    let left =
      (scrollLeft.value / (scrollWidth.value - clientWidth.value)) *
      (props.scrollbarWidth - props.thumbWidth)
    if (!Number.isFinite(left)) {
      left = 0
    }
    return {
      transform: `translateX(${left}px)`,
      width: props.thumbWidth + 'px',
      backgroundColor: props.thumbBg,
    }
  }
})
</script>

<style lang="scss">
@import './index.scss';
</style>
