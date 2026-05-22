<template>
  <sar-list card>
    <sar-list-item hover arrow title="默认id的Toast" @click="onShowToast1" />
    <sar-list-item hover arrow title="自定义id的Toast" @click="onShowToast2" />
    <sar-list-item hover arrow title="隐藏指定Toast" @click="onHideToast" />
    <sar-list-item hover arrow title="隐藏所有Toast" @click="onHideAll" />
  </sar-list>

  <sar-toast-agent />
  <sar-toast-agent id="custom-toast" />
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const onShowToast1 = () => {
  toast('使用默认id')
}

const onShowToast2 = () => {
  toast.success('使用自定义id', {
    id: 'custom-toast',
  })
}

const onHideToast = () => {
  toast.hide('custom-toast')
}

const onHideAll = () => {
  toast.hideAll()
}
</script>
