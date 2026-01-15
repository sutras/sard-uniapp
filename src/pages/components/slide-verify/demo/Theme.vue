<template>
  <view class="mx-80">
    <sar-slide-verify
      ref="verifyRef"
      text="拖动滑块至虚线框内"
      success-text="验证通过"
      error-text="验证失败"
      show-target
      :target-pos="targetPos"
      :reset-when-error="false"
      :verify="verify"
      style="--sar-slide-verify-theme-color: var(--sar-primary)"
    ></sar-slide-verify>

    <sar-button type="pale-text" class="mt-40" @click="onReset">
      重置验证
    </sar-button>
  </view>
</template>

<script setup lang="ts">
import {
  random,
  sleep,
  SlideVerifyExpose,
  SlideVerifyResult,
} from 'sard-uniapp'
import { ref } from 'vue'

const targetPos = ref(random(50, 100))

const verify = async ({ targetPos, actualPos }: SlideVerifyResult) => {
  await sleep(300)

  const errorValue = 2
  if (
    actualPos >= targetPos - errorValue &&
    actualPos <= targetPos + errorValue
  ) {
    return true
  }
  return false
}

const verifyRef = ref<SlideVerifyExpose>()

const onReset = () => {
  verifyRef.value?.reset()
  targetPos.value = random(50, 100)
}
</script>
