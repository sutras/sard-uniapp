<template>
  <view class="mx-80">
    <sar-puzzle-verify
      ref="verifyRef"
      text="请按住滑块拖动"
      success-text="验证通过"
      :src="src"
      :target-pos="targetPos"
      :verify="verify"
      :aspect-ratio="320 / 219"
    ></sar-puzzle-verify>

    <sar-button type="pale-text" class="mt-40" @click="onReset">
      重置验证
    </sar-button>
    <sar-button type="pale-text" class="mt-20" @click="onUpdate">
      更新
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

const targetPos = ref(random(30, 80))
const src = ref('')

const verify = async ({ actualPos, targetPos }: SlideVerifyResult) => {
  await sleep(100)

  const errorValue = 3
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
  targetPos.value = random(30, 80)
}

let i = 0
function update() {
  src.value = `https://fastly.jsdelivr.net/npm/@sard/assets/images/cat${(i = ++i % 12) || 12}.jpg`
}
update()

const onUpdate = () => {
  update()
  onReset()
}
</script>
