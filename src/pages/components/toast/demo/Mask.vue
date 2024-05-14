<template>
  <sar-list card>
    <sar-list-item hover arrow title="显示背景" @click="showOverlayToast" />
    <sar-list-item
      hover
      arrow
      title="透明背景"
      @click="showTransparentOverlayToast"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const showOverlayToast = () => {
  toast.loading('加载中', {
    overlay: true,
  })

  setTimeout(() => {
    toast.hide()
  }, 1500)
}

const showTransparentOverlayToast = () => {
  toast.loading('加载中', {
    overlay: true,
    transparent: true,
  })

  setTimeout(() => {
    toast.hide()
  }, 1500)
}
</script>
