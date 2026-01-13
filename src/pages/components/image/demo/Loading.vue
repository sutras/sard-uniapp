<template>
  <sar-segmented v-model="src" :options="options" />

  <view style="height: 320rpx; margin-top: 20rpx">
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

<script setup lang="ts">
import { sleep } from 'sard-uniapp'
import { ref } from 'vue'

const src = ref('')

const options = [
  { label: '销毁图片', value: '' },
  {
    label: '加载图片',
    value: 'https://fastly.jsdelivr.net/npm/@sard/assets/images/tiger1.jpg',
  },
]

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
