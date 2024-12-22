<template>
  <scroll-view
    :id="fixationId"
    :class="fixationClass"
    :style="fixationStyle"
    :scroll-y="scrollY"
    scroll-x
    :upper-threshold="0"
    :lower-threshold="0"
    :throttle="false"
    @scroll="onScroll"
    @scrolltoupper="onScrolltoupper"
    @scrolltolower="onScrolltolower"
  >
    <slot></slot>
  </scroll-view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
  NodeRect,
} from '../../utils'
import {
  type TableFixationProps,
  type TableFixationSlots,
  type TableFixationEmits,
  type TableScrollSide,
} from '../table/common'
import { nextTick } from 'vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TableFixationProps>(), {})

defineSlots<TableFixationSlots>()

const emit = defineEmits<TableFixationEmits>()

const bem = createBem('table')

// main
const scrollSide = ref<TableScrollSide | null>(null)

const onScroll = (event: any) => {
  if (event.detail.scrollLeft !== 0) {
    scrollSide.value = 'middle'
  }
}

const onScrolltoupper = (event: any) => {
  if (event.detail.direction === 'left') {
    scrollSide.value = 'left'
  }
}

const onScrolltolower = (event: any) => {
  if (event.detail.direction === 'right') {
    scrollSide.value = 'right'
  }
}

const fixationId = uniqid()
const instance = getCurrentInstance()

const fixationRect = ref<NodeRect | null>(null)

watch([() => props.tableWidth, fixationRect], () => {
  scrollSide.value =
    props.tableWidth &&
    fixationRect.value &&
    props.tableWidth > fixationRect.value.width
      ? 'left'
      : null
})

onMounted(() => {
  nextTick(setFixationRect)
})

const setFixationRect = async () => {
  fixationRect.value = await getBoundingClientRect(`#${fixationId}`, instance)
}

uni.onWindowResize(setFixationRect)

watch(
  scrollSide,
  () => {
    emit('scroll-side', scrollSide.value)
  },
  {
    immediate: true,
  },
)

// others
const fixationClass = computed(() => {
  return classNames(
    bem.e('fixation'),
    bem.em('fixation', 'bordered', props.bordered),
    bem.em('fixation', 'underline', props.underline),
    props.rootClass,
  )
})

const fixationStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    height: props.height,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
