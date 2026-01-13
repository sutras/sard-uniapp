<template>
  <view :class="imageClass" :style="imageStyle" @click="onClick">
    <view
      v-if="props.showLoading && status & STATUS.FIRST_LOADING"
      :class="bem.e('loading')"
    >
      <slot v-if="$slots.loading" name="loading"></slot>
      <sar-icon v-else :family="iconFamily || 'sari'" :name="loadingIcon" />
    </view>
    <view
      v-else-if="props.showError && status & STATUS.ERROR"
      :class="bem.e('error')"
    >
      <slot v-if="$slots.error" name="error"></slot>
      <sar-icon v-else :family="iconFamily || 'sari'" :name="errorIcon" />
    </view>
    <view
      v-else
      :class="displayClass"
      :style="displayStyle"
      @animationend="isAnimationEnd = true"
    ></view>
    <!-- #ifdef WEB -->
    <img
      :src="realPath"
      :loading="lazyLoad ? 'lazy' : 'eager'"
      :class="interactionClass"
      @load="onLoad"
      @error="onError"
    />
    <!-- #endif -->
    <!-- #ifndef WEB -->
    <image
      :src="realPath"
      :lazy-load="lazyLoad"
      :webp="webp"
      :show-menu-by-longpress="showMenuByLongpress"
      :class="interactionClass"
      @load="onLoad"
      @error="onError"
    ></image>
    <!-- #endif -->
    <sar-resize-sensor
      v-if="resizeSensorVisible"
      initial
      :threshold="0"
      @resize="onResize"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  type NodeRect,
  isNullish,
} from '../../utils'
import {
  type ImageProps,
  type ImageSlots,
  type ImageEmits,
  type ImageExpose,
  defaultImageProps,
  FIX_MODES,
  IMAGE_MODES,
} from './common'
import SarResizeSensor from '../resize-sensor/resize-sensor.vue'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ImageProps>(), defaultImageProps)

defineSlots<ImageSlots>()

const emit = defineEmits<ImageEmits>()

const bem = createBem('image')

// main
const getRealPath = (filePath: string) => {
  // #ifdef WEB
  if (filePath && /^\/(?!\/)/.test(filePath)) {
    // @ts-expect-error __uniConfig
    const base = typeof __uniConfig === 'object' ? __uniConfig.router?.base : ''
    if (base) {
      return base + filePath.slice(1)
    }
  }
  // #endif
  return filePath
}

const realPath = computed(() => getRealPath(props.src))

enum STATUS {
  UNSTATED = 0,
  FIRST_LOADING = 1 << 0,
  LATER_LOADING = 1 << 2,
  LOADED = 1 << 3,
  ERROR = 1 << 4,
}
const status = ref<STATUS>(STATUS.UNSTATED)
const isLoaded = ref(false)

const isAnimationEnd = ref(false)

const resizeSensorVisible = computed(
  () => FIX_MODES[props.mode as keyof typeof FIX_MODES],
)
const sensorWidth = ref(0)
const sensorHeight = ref(0)

const onResize = (res: NodeRect) => {
  sensorWidth.value = res.width
  sensorHeight.value = res.height
}

const aspectRatio = ref(0)

const loadedUrl = ref('')

const doLoad = (event: any) => {
  const { width, height } =
    event.target && !isNullish(event.target.naturalWidth)
      ? {
          width: event.target.naturalWidth,
          height: event.target.naturalHeight,
        }
      : event.detail

  aspectRatio.value = width / height
  status.value = STATUS.LOADED
  isLoaded.value = true
  loadedUrl.value = realPath.value
  emit('load', event)
}

const onLoad = async (event: any) => {
  if (!props.customLoad) {
    doLoad(event)
  }
}

const onError = (event: any) => {
  status.value = STATUS.ERROR
  emit('error', event)
}

const onClick = (event: any) => {
  emit('click', event)
}

watch(
  realPath,
  async () => {
    if (realPath.value) {
      status.value =
        isLoaded.value && !(status.value & STATUS.ERROR)
          ? STATUS.LATER_LOADING
          : STATUS.FIRST_LOADING
    }
    if (props.customLoad) {
      props.customLoad((event) => {
        doLoad(event)
      })
    }
  },
  {
    immediate: true,
  },
)

// others
defineExpose<ImageExpose>({})

const imageClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.shape),
    bem.m('animated', props.fade && !isAnimationEnd.value),
    props.rootClass,
  )
})

const imageStyle = computed(() => {
  return stringifyStyle(props.rootStyle, {
    width:
      status.value & STATUS.LOADED && props.mode === 'heightFix'
        ? aspectRatio.value * sensorHeight.value + 'px'
        : props.width,
    height:
      status.value & STATUS.LOADED && props.mode === 'widthFix'
        ? sensorWidth.value / aspectRatio.value + 'px'
        : props.height,
    borderRadius: props.shape === 'square' ? props.radius : undefined,
    background: status.value & STATUS.LOADED ? 'transparent' : props.background,
  })
})

const displayClass = computed(() => {
  return classNames(bem.e('display'))
})

const displayStyle = computed(() => {
  return stringifyStyle({
    backgroundImage: loadedUrl.value ? `url(${loadedUrl.value})` : 'none',
    backgroundPosition: IMAGE_MODES[props.mode][0],
    backgroundSize: IMAGE_MODES[props.mode][1],
  })
})

const interactionClass = computed(() => {
  return classNames(bem.e('interaction'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
