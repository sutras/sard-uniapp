<template>
  <sar-upload :max-size="1 * 1024" multiple :over-size="overSize" />
</template>

<script setup lang="ts">
import { toast, type UploadFileItem } from '@sard/uniapp'

const overSize = (fileItem: UploadFileItem[]) => {
  console.log(fileItem)
  toast('文件大小不能超过1KB')
}
</script>
