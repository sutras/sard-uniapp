<template>
  <sar-button @click="onClick">选择图片</sar-button>

  <image
    :src="url"
    mode="aspectFit"
    :style="{
      width: width + 'px',
      height: height + 'px',
      marginTop: '20rpx',
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cropImage } from 'sard-uniapp'

const url = ref('')

const width = ref(0)
const height = ref(0)

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
        success(filePath, info) {
          url.value = filePath
          width.value = info.width
          height.value = info.height
        },
      })
    },
  })
}
</script>
