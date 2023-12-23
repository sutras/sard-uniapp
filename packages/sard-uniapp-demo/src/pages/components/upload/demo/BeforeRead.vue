<template>
  <sar-upload :before-read="beforeRead" />
</template>

<script setup lang="ts">
import { toast, type UploadFile } from 'sard-uniapp'

const beforeRead = (file: UploadFile) => {
  if (file.path) {
    toast('阻止文件选择')
    return false
  }
  return true
}
</script>
