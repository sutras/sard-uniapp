<template>
  <sar-upload :before-choose="beforeChoose" />
</template>

<script setup lang="ts">
import { toast, UploadProps } from 'sard-uniapp'

const beforeChoose: UploadProps['beforeChoose'] = (
  fileList,
  sourceType,
  next,
) => {
  console.log(fileList, sourceType)

  // #ifdef APP-PLUS
  // sourceType在app端的值只会出现 album | camera 其中一个
  if (sourceType.length === 1) {
    if (sourceType[0] === 'camera') return next(true)

    setTimeout(() => {
      toast('没有相册权限，请先授权')
      next(false)
    }, 300)
  }
  // #endif

  // #ifndef APP-PLUS
  setTimeout(() => {
    toast('没有相册权限，请先授权')
    next(false)
  }, 300)
  // #endif
}
</script>
