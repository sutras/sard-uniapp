<template>
  <view :class="readMoreClass" :style="readMoreStyle">
    <view :id="contentId" :class="bem.e('content')" :style="contentStyle">
      <slot></slot>
      <view :class="bem.e('shadow')"></view>
    </view>
    <view
      v-if="!hideToggle"
      :id="toggleId"
      :class="bem.e('toggle')"
      @touchstart="onTouchStart"
      @mousedown="onMouseDown"
    >
      <sar-button type="pale-text" @click="onButtonClick">
        <text>{{ toggleText }}</text>
        <sar-icon family="sari" :name="toggleIcon" />
      </sar-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import {
  type ReadMoreProps,
  type ReadMoreSlots,
  type ReadMoreEmits,
  type ReadMoreExpose,
  defaultReadMoreProps,
} from './common'
import SarButton from '../button/button.vue'
import SarIcon from '../icon/icon.vue'
import { useTranslate } from '../locale'
import { useMouseDown, useSingleTask } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ReadMoreProps>(), defaultReadMoreProps)

defineSlots<ReadMoreSlots>()

const emit = defineEmits<ReadMoreEmits>()

const bem = createBem('read-more')

const { t } = useTranslate('readMore')

// main
const innerVisible = ref(props.visible)

const { startTask, onFinishTask } = useSingleTask()

watch(
  () => props.visible,
  () => {
    onFinishTask(() => {
      innerVisible.value = props.visible
    })
  },
)

const handleClick = () => {
  innerVisible.value = !innerVisible.value

  emit('update:visible', innerVisible.value)

  if (innerVisible.value) {
    emit('open')
  } else {
    onClose()
    emit('close')
  }
}

const onButtonClick = () => {
  onFinishTask(handleClick)
}

const toggleText = computed(() => {
  return innerVisible.value
    ? props.openText || t('fold')
    : props.closeText || t('unfold')
})

const toggleIcon = computed(() => {
  return innerVisible.value ? 'up' : 'down'
})

const hideToggle = computed(() => {
  return innerVisible.value && props.hideClose
})

// scroll
const contentId = uniqid()
const toggleId = uniqid()
const instance = getCurrentInstance()

let scrollTop = 0

const onTouchStart = (event: any) => {
  if (props.keepLocation && innerVisible.value) {
    startTask(async () => {
      const { clientY, pageY } = event.touches[0] as Touch
      const contentRect = await getBoundingClientRect(`#${contentId}`, instance)
      const toggleRect = await getBoundingClientRect(`#${toggleId}`, instance)

      const closeContentHeight = Math.min(props.maxHeight, contentRect.height)
      const openContentHeight = contentRect.height
      const offsetTop = clientY - toggleRect.top
      const openContentPageY = pageY - offsetTop - openContentHeight
      const closeContentClientY = toggleRect.top - closeContentHeight
      scrollTop = openContentPageY - closeContentClientY
    })
  }
}

const onMouseDown = useMouseDown(onTouchStart)

const onClose = () => {
  if (props.keepLocation) {
    uni.pageScrollTo({
      scrollTop: scrollTop,
      duration: 0,
    })
  }
}

defineExpose<ReadMoreExpose>({})

// others

const readMoreClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('close', !innerVisible.value),
    props.rootClass,
  )
})

const readMoreStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const contentStyle = computed(() => {
  return {
    maxHeight: innerVisible.value ? 'none' : props.maxHeight + 'px',
  }
})
</script>

<style lang="scss">
@import './index.scss';
</style>
