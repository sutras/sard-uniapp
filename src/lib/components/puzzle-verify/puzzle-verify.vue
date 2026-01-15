<template>
  <view :class="puzzleVerifyClass" :style="puzzleVerifyStyle">
    <view :class="bem.e('frame')">
      <image
        mode="widthFix"
        :class="bem.e('whole')"
        :src="src"
        @load="onLoad"
      />
      <view :class="bem.e('hollow')"></view>
      <view :class="bem.e('piece')">
        <image mode="widthFix" :class="bem.e('piece-img')" :src="src" />
        <view :class="bem.e('piece-shadow')"></view>
      </view>
    </view>

    <sar-slide-verify
      ref="slideVerifyRef"
      :target-pos="targetPos"
      :text="text"
      :success-text="successText"
      :error-text="errorText"
      :disabled="disabled"
      :reset-when-error="resetWhenError"
      :show-target="showTarget"
      :verify="verify"
      @start="onStart"
      @move="emit('move', $event)"
      @end="onEnd"
      @change="onChange"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  clamp,
  random,
} from '../../utils'
import {
  type PuzzleVerifyProps,
  type PuzzleVerifySlots,
  type PuzzleVerifyEmits,
  type PuzzleVerifyExpose,
  defaultPuzzleVerifyProps,
} from './common'
import SarSlideVerify from '../slide-verify/slide-verify.vue'
import { type SlideVerifyExpose } from '../slide-verify/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<PuzzleVerifyProps>(),
  defaultPuzzleVerifyProps,
)

defineSlots<PuzzleVerifySlots>()

const emit = defineEmits<PuzzleVerifyEmits>()

const bem = createBem('puzzle-verify')

// main
const defaultAspectRatio = 320 / 240
const aspectRatio = ref(props.aspectRatio || defaultAspectRatio)

const onLoad = (event: any) => {
  const { width, height } = event.detail
  aspectRatio.value = width / height || defaultAspectRatio
}

const percent = ref(0)

const onChange = (value: number) => {
  percent.value = value
  emit('change', value)
}

const y = ref(random(20, 80))

const targetPos = computed(() => {
  return clamp(props.targetPos ?? 100, 0, 100)
})

const slideVerifyRef = ref<SlideVerifyExpose>()

const reset = () => {
  slideVerifyRef.value?.reset()
  y.value = random(20, 80)
}

const isDown = ref(false)

const onStart = (event: any) => {
  emit('start', event)
  isDown.value = true
}
const onEnd = (event: any) => {
  emit('end', event)
  isDown.value = false
}

// others
defineExpose<PuzzleVerifyExpose>({ reset })

const puzzleVerifyClass = computed(() => {
  return classNames(bem.b(), bem.m('down', isDown.value), props.rootClass)
})

const puzzleVerifyStyle = computed(() => {
  return stringifyStyle(
    {
      '--y': y.value / 100,
      '--actual-x': percent.value / 100,
      '--target-x': targetPos.value / 100,
      '--padding-top': (1 / aspectRatio.value) * 100 + '%',
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
