<template>
  <view :class="noticeBarClass" :style="noticeBarStyle" @click="onClick">
    <view v-if="!hideLeftIcon" :class="bem.e('left-icon')">
      <slot name="left-icon">
        <sar-icon family="sari" name="volume-up" />
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
        <sar-resize-sensor @resize="onResize" />
      </view>
    </view>
    <view
      v-if="closable || linkable"
      :class="bem.e('right-icon')"
      @click="onRightIconClick"
    >
      <slot name="right-icon">
        <sar-icon
          family="sari"
          :name="closable ? 'close' : linkable ? 'right' : ''"
        />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, onMounted } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import SarIcon from '../icon/icon.vue'
import SarResizeSensor from '../resize-sensor/resize-sensor.vue'
import {
  type NoticeBarProps,
  type NoticeBarSlots,
  type NoticeBarEmits,
  type NoticeBarExpose,
  defaultNoticeBarProps,
} from './common'
import { useTimeout } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<NoticeBarProps>(), defaultNoticeBarProps)

defineSlots<NoticeBarSlots>()

const emit = defineEmits<NoticeBarEmits>()

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

const update = async () => {
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

const { start: updateLater } = useTimeout(
  () => {
    update()
  },
  () => props.delay,
)

onMounted(() => {
  if (props.scrollable) {
    updateLater()
  }
})

const onResize = () => {
  update()
}

// visible
const innerVisible = ref(props.visible)
const onRightIconClick = () => {
  if (props.closable) {
    innerVisible.value = false
    emit('close')
  }
}

// others
const onClick = (event: any) => {
  emit('click', event)
}

defineExpose<NoticeBarExpose>({
  update,
})

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
    animationDuration: `${
      firstLap.value ? wrapperData.value.first : wrapperData.value.later
    }ms`,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
