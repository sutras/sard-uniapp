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
    :change:prop="wxsswipe.statusYWatch"
    :data-status="status"
    :data-scrolltop="scrollTop"
    :data-threshold="threshold"
    :data-headerheight="headerHeight"
    :data-duration="transitionDuration"
    :data-disabled="disabled"
    @touchstart="wxsswipe.onTouchStart"
    @touchmove="wxsswipe.onTouchMove"
    @touchend="wxsswipe.onTouchEnd"
    @touchcancel="wxsswipe.onTouchEnd"
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
<script src="./wx.wxs" module="wxsswipe" lang="wxs"></script>
<!-- #endif -->

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  toTouchEvent,
} from '../../utils'
import {
  type PullDownRefreshStatus,
  type PullDownRefreshExpose,
  pullDownRefreshProps,
} from './common'
import { useSetTimeout } from '../../use'
import SarLoading from '../loading/loading.vue'

export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    SarLoading,
  },
  props: pullDownRefreshProps,
  emit: ['refresh'],
  setup(props, { emit, expose }) {
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
      if (
        props.disabled ||
        status.value !== 'initial' ||
        scrollTop.value !== 0
      ) {
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

    const onMouseDown = (event: MouseEvent) => {
      // #ifdef H5
      const info = uni.getSystemInfoSync()

      onTouchStart(toTouchEvent(event, info.windowTop))

      const moveHandler = (event: MouseEvent) => {
        onTouchMove(toTouchEvent(event, info.windowTop))
      }
      const upHandler = () => {
        onTouchEnd()
        document.removeEventListener('mouseup', upHandler)
        document.removeEventListener('mousemove', moveHandler)
      }
      document.addEventListener('mousemove', moveHandler)
      document.addEventListener('mouseup', upHandler)
      // #endif
    }

    const scrollTop = ref(0)

    const setScrollTop = (sTop: number) => {
      scrollTop.value = sTop
    }

    expose<PullDownRefreshExpose>({
      setScrollTop,
      _setStatus: (newStatus) => {
        status.value = newStatus
      },
      _emit(event) {
        emit(event.name, event.payload)
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

    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      status,
      progress,
      bem,
      pullDownRefreshClass,
      pullDownRefreshStyle,
      headerStyle,
      loadingClass,

      scrollTop,
    }
  },
}
</script>

<style lang="scss">
@import './index.scss';
</style>
