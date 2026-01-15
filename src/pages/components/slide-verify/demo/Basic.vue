<template>
  <sar-slide-verify
    ref="verifyRef"
    text="请按住滑块拖动"
    success-text="验证通过"
    :verify="verify"
  ></sar-slide-verify>

  <sar-button type="pale-text" class="mt-40" @click="onReset">
    重置验证
  </sar-button>
</template>

<script setup lang="ts">
import { sleep, SlideVerifyExpose, SlideVerifyResult } from 'sard-uniapp'
import { ref } from 'vue'

const verify = async ({ actualPos }: SlideVerifyResult) => {
  await sleep(300)

  if (actualPos === 100) {
    return true
  }
  return false
}

const verifyRef = ref<SlideVerifyExpose>()

const onReset = () => {
  verifyRef.value?.reset()
}
</script>
