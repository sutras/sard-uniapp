<template>
  <sar-button class="mb-10" @click="loadImage">点击加载图片</sar-button>

  <view style="height: 320rpx">
    <sar-image
      v-if="src"
      :src="src"
      width="320rpx"
      height="320rpx"
      :custom-load="customLoad"
    ></sar-image>
    <sar-image
      v-if="src"
      :src="src"
      width="320rpx"
      height="320rpx"
      class="ml-10"
      :custom-load="customLoad"
    >
      <template #loading>
        <text class="text-sm">加载中...</text>
      </template>
    </sar-image>
  </view>
</template>

<script lang="ts" setup>
import { sleep } from 'sard-uniapp'
import { ref } from 'vue'

const src = ref('')

const loadImage = () => {
  src.value = 'https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger1.jpg'
}

const customLoad = async (callback: any) => {
  await sleep(1000)
  callback({
    detail: {
      width: 640,
      height: 427,
    },
  })
}
</script>
