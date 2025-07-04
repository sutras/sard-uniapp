<template>
  <sar-upload :before-choose="beforeChoose" />
</template>

<script setup lang="ts">
import { toast, type UploadProps } from 'sard-uniapp'

const beforeChoose: UploadProps['beforeChoose'] = (fileList, next) => {
  console.log(fileList)

  uni.showActionSheet({
    itemList: ['拍摄', '从相册选择'],
    success(res) {
      if (res.tapIndex === 0) {
        next({
          sourceType: ['camera'],
        })
      } else if (res.tapIndex === 1) {
        setTimeout(() => {
          toast('无相册权限')
          next(false)
        }, 150)
      }
    },
    fail() {
      next(false)
    },
  })
}
</script>
