<template>
  <sar-button @click="onClick">选择图片</sar-button>

  <image
    :src="url"
    mode="aspectFit"
    style="width: 320rpx; height: 320rpx; margin-top: 20rpx"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cropImage } from 'sard-uniapp'

const url = ref('')

const onClick = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      cropImage({
        src: res.tempFilePaths[0],
        beforeCrop() {
          return 0.3
        },
        success(filePath) {
          url.value = filePath
        },
      })
    },
  })
}
</script>
