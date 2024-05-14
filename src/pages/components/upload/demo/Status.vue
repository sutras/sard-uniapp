<template>
  <sar-upload v-model="fileList" :after-read="afterRead" />
</template>

<script setup lang="ts">
import type { UploadFileItem } from 'sard-uniapp'
import { ref } from 'vue'

const fileList = ref<UploadFileItem[]>([
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
  },
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
    status: 'uploading',
    message: '正在上传',
  },
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
    status: 'failed',
    message: '上传失败',
  },
])

const afterRead = (fileItem: UploadFileItem) => {
  console.log(fileItem)
  fileItem.status = 'uploading'
  fileItem.message = '正在上传'
  fileList.value = [...fileList.value]

  setTimeout(() => {
    fileItem.status = 'done'
    fileList.value = [...fileList.value]
  }, 1500)
}
</script>
