<template>
  <sar-upload :before-choose="beforeChoose" />
</template>

<script setup lang="ts">
import { toast, UploadProps } from 'sard-uniapp'

const beforeChoose: UploadProps['beforeChoose'] = (fileList, next) => {
  console.log(fileList)

  setTimeout(() => {
    toast('没有相册权限，请先授权')
    next(false)
  }, 300)
}
</script>
