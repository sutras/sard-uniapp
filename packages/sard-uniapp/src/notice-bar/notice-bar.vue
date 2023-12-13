<template>
  <view :class="noticeBarClass" :style="noticeBarStyle" @click="onClick">
    <view v-if="!hideLeftIcon" :class="bem.e('left-icon')">
      <slot name="left-icon">
        <Icon name="volume-up" />
      </slot>
    </view>
    <view :class="bem.e('content')" :id="contentId">
      <view
        :class="bem.e('wrapper')"
        :id="wrapperId"
        :style="wrapperStyle"
        @animationend="onAnimationEnd"
      >
        <slot></slot>
      </view>
    </view>
    <view
      v-if="closable || linkable"
      :class="bem.e('right-icon')"
      @click="onRightIconClick"
    >
      <slot name="right-icon">
        <Icon :name="closable ? 'close' : linkable ? 'right' : ''" />
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, onMounted } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../utils'
import Icon from '../icon/icon.vue'
import { noticeBarProps } from './common'

const props = defineProps(noticeBarProps)

const emit = defineEmits(['click', 'close'])

const bem = createBem('notice-bar')

// main
const instance = getCurrentInstance()
const contentId = uniqid()
const wrapperId = uniqid()
const shouldScroll = ref(false)
const wrapperData = ref({
  first: 0,
  later: 0,
  contentWidth: 0,
})

const getWidth = async (id: string) => {
  return (await getBoundingClientRect(`#${id}`, instance)).width
}

const updateWrapperData = async () => {
  if (props.scrollable === 'never') {
    shouldScroll.value = false
    return
  }

  const [contentWidth, wrapperWidth] = await Promise.all([
    getWidth(contentId),
    getWidth(wrapperId),
  ])

  const nextShouldScroll =
    props.scrollable === 'always' || wrapperWidth > contentWidth

  if (nextShouldScroll) {
    wrapperData.value = {
      first: (wrapperWidth / props.speed) * 1000,
      later: ((wrapperWidth + contentWidth) / props.speed) * 1000,
      contentWidth,
    }
  }

  shouldScroll.value = nextShouldScroll
}

const firstLap = ref(true)

const onAnimationEnd = () => {
  if (firstLap.value) {
    firstLap.value = false
  }
}

const innerVisible = ref(props.visible)
const onRightIconClick = () => {
  if (props.closable) {
    innerVisible.value = false
    emit('close')
  }
}

onMounted(() => {
  if (props.scrollable) {
    updateWrapperData()
  }
})

const onClick = (event: any) => {
  emit('click', event)
}

// others
const noticeBarClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('wrap', props.wrap),
    bem.m('vertical', props.vertical),
    bem.m('linkable', props.linkable),
    bem.m('infinite', !firstLap.value),
    bem.m('scrollable', shouldScroll.value),
    props.rootClass,
  )
})

const noticeBarStyle = computed(() => {
  return stringifyStyle(
    {
      color: props.color,
      background: props.background,
      display: innerVisible.value ? 'flex' : 'none',
    },
    props.rootStyle,
  )
})

const wrapperStyle = computed(() => {
  return stringifyStyle({
    transform: `translateX(${
      firstLap.value ? 0 : wrapperData.value.contentWidth
    }px)`,
    animationDelay: `${firstLap.value ? props.delay : 0}ms`,
    animationDuration: `${
      firstLap.value ? wrapperData.value.first : wrapperData.value.later
    }ms`,
  })
})
</script>

<style lang="scss">
@use './index.scss';
</style>
