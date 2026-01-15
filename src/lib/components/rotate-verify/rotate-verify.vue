<template>
  <view :class="rotateVerifyClass" :style="rotateVerifyStyle">
    <image
      :class="bem.e('image')"
      :style="imageStyle"
      :src="src"
      mode="aspectFill"
    />
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
      @change="onChange"
    >
      <template #text-before>
        <slot name="text-before"></slot>
      </template>
      <template #text-after>
        <slot name="text-after"></slot>
      </template>
    </sar-slide-verify>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type RotateVerifyProps,
  type RotateVerifySlots,
  type RotateVerifyEmits,
  type RotateVerifyExpose,
  defaultRotateVerifyProps,
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
  defineProps<RotateVerifyProps>(),
  defaultRotateVerifyProps,
)

defineSlots<RotateVerifySlots>()

const emit = defineEmits<RotateVerifyEmits>()

const bem = createBem('rotate-verify')

// main
const percent = ref(0)
const targetDegree = computed(() => ((props.targetPos ?? 100) / 100) * 360)
const slideDegree = computed(() => (percent.value / 100) * 360)

const onChange = (value: number) => {
  percent.value = value
  emit('change', value)
}

const slideVerifyRef = ref<SlideVerifyExpose>()

const reset = () => {
  slideVerifyRef.value?.reset()
}

// others
defineExpose<RotateVerifyExpose>({ reset })

const rotateVerifyClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const rotateVerifyStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const imageStyle = computed(() => {
  return stringifyStyle({
    transform: `rotate(${targetDegree.value}deg) rotate(${-slideDegree.value}deg)`,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
