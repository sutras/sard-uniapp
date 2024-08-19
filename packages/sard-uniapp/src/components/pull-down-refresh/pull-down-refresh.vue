<template>
  <!-- #ifndef MP-WEIXIN -->
  <view
    :class="pullDownRefreshClass"
    :style="pullDownRefreshStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @mousedown="onMouseDown"
  >
    <view :class="bem.e('header')" :style="headerStyle">
      <slot v-if="status === 'unready'" name="unready" :progress="progress">
        <sar-loading
          type="clock"
          :class="loadingClass"
          :animated="false"
          :progress="progress"
        />
      </slot>
      <slot v-else-if="status === 'ready'" name="ready">
        <sar-loading type="clock" :class="loadingClass" :animated="false" />
      </slot>
      <slot v-else-if="status === 'loading'" name="loading">
        <sar-loading type="clock" :class="loadingClass" />
      </slot>
      <slot v-else-if="status === 'done'" name="done"></slot>
    </view>
    <slot></slot>
  </view>
  <!-- #endif -->
  <!-- #ifdef MP-WEIXIN -->
  <view
    :class="pullDownRefreshClass"
    :style="pullDownRefreshStyle"
    :prop="status"
    :change:prop="touch.statusYWatch"
    :data-status="status"
    :data-canrefresh="canRefresh"
    :data-threshold="threshold"
    :data-headerheight="headerHeight"
    :data-duration="transitionDuration"
    :data-disabled="disabled"
    @touchstart="touch.onTouchStart"
    @touchmove="touch.onTouchMove"
    @touchend="touch.onTouchEnd"
    @touchcancel="touch.onTouchEnd"
  >
    <view :class="bem.e('header')" :style="headerStyle">
      <slot v-if="status === 'unready'" name="unready" :progress="progress">
        <sar-loading
          type="clock"
          :class="loadingClass"
          :animated="false"
          :progress="progress"
        />
      </slot>
      <slot v-else-if="status === 'ready'" name="ready">
        <sar-loading type="clock" :class="loadingClass" :animated="false" />
      </slot>
      <slot v-else-if="status === 'loading'" name="loading">
        <sar-loading type="clock" :class="loadingClass" />
      </slot>
      <slot v-else-if="status === 'done'" name="done"></slot>
    </view>
    <slot></slot>
  </view>
  <!-- #endif -->
</template>

<!-- #ifdef MP-WEIXIN -->
<!-- <script src="./touch.wxs" module="touch" lang="wxs"></script> -->
<!-- #endif -->

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type PullDownRefreshProps,
  type PullDownRefreshSlots,
  type PullDownRefreshEmits,
  type PullDownRefreshExpose,
  type PullDownRefreshStatus,
  pullDownRefreshPropsDefaults,
} from './common'
import { useMouseDown, useSetTimeout } from '../../use'
import SarLoading from '../loading/loading.vue'

const touch: any = {}

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<PullDownRefreshProps>(),
  pullDownRefreshPropsDefaults,
)

defineSlots<PullDownRefreshSlots>()

const emit = defineEmits<PullDownRefreshEmits>()

const bem = createBem('pull-down-refresh')

// main
const status = ref<PullDownRefreshStatus>('initial')
const translateY = ref(0)
const progress = computed(() => {
  return Math.min(translateY.value / props.threshold, 1)
})

const [toInitialLater, cancelToInitial] = useSetTimeout(() => {
  status.value = 'initial'
})

const [toRecoveringLater, cancelToRecovering] = useSetTimeout(() => {
  toRecovering()
})

const toLoading = () => {
  cancelToRecovering()
  cancelToInitial()
  status.value = 'loading'
  translateY.value = props.headerHeight
}

const toRecovering = () => {
  status.value = 'recovering'
  translateY.value = 0
  toInitialLater(props.transitionDuration)
}

const toDone = () => {
  status.value = 'done'
  toRecoveringLater(props.doneDuration)
}

watch(
  () => props.loading,
  () => {
    if (props.loading) {
      toLoading()
    } else {
      toDone()
    }
  },
)

onMounted(() => {
  if (props.loading) {
    toLoading()
  }
})

let startX = 0
let startY = 0
let movable = false
let lockDirection = ''
const isDragging = ref(false)

const onTouchStart = (event: TouchEvent) => {
  if (props.disabled || status.value !== 'initial' || !canRefresh.value) {
    return
  }
  startX = event.touches[0].clientX
  startY = event.touches[0].clientY
  movable = true
}

const onTouchMove = (event: TouchEvent) => {
  if (!movable || (lockDirection && lockDirection !== 'down')) {
    return
  }

  const deltaX = event.touches[0].clientX - startX
  const deltaY = event.touches[0].clientY - startY

  if (!lockDirection) {
    const isVertical = Math.abs(deltaY) >= Math.abs(deltaX)
    lockDirection = isVertical && deltaY > 0 ? 'down' : 'others'
  }

  if (lockDirection === 'down') {
    const offsetY = Math.max(deltaY, 0) / 2
    status.value = offsetY >= props.threshold ? 'ready' : 'unready'
    translateY.value = offsetY
    isDragging.value = true

    event.preventDefault()
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation()
    } else if (event.stopPropagation) {
      event.stopPropagation()
    }
  }
}

const onTouchEnd = () => {
  movable = false
  lockDirection = ''
  isDragging.value = false

  switch (status.value) {
    case 'unready':
      toRecovering()
      return
    case 'ready':
      toLoading()
      emit('refresh')
      return
  }
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

const canRefresh = ref(true)

const enableToRefresh = (can: boolean) => {
  canRefresh.value = can
}

defineExpose<PullDownRefreshExpose>({
  enableToRefresh,
  _setStatus: (newStatus) => {
    status.value = newStatus
  },
  _emit(event) {
    emit(event.name)
  },
  _toRecovering: toRecovering,
  _toLoading: toLoading,
  _setTranslateY: (y) => {
    translateY.value = y
  },
})

// others
const pullDownRefreshClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const pullDownRefreshStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    transform: `translate3d(0,${translateY.value}px,0)`,
    transitionDuration:
      (isDragging.value ? 0 : props.transitionDuration) + 'ms',
  })
})

const headerStyle = computed(() => {
  return stringifyStyle({
    height: props.headerHeight + 'px',
  })
})

const loadingClass = computed(() => {
  return classNames(bem.e('loading'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
