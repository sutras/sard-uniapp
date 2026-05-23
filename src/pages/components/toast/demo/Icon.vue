<template>
  <sar-toast-agent id="customToastIcon">
    <template #icon>
      <sar-icon name="/static/logo.svg" size="64rpx" />
    </template>
  </sar-toast-agent>
  <sar-list card>
    <sar-list-item hover arrow title="自定义图标" @click="onIconToast" />
    <sar-list-item hover arrow title="使用图标属性" @click="onIconPropToast" />
  </sar-list>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const onIconToast = () => {
  toast.success({
    id: 'customToastIcon',
    title: '自定义图标',
  })
}

const onIconPropToast = () => {
  toast.success('使用 icon 属性', {
    icon: 'star-fill',
    iconFamily: 'sari',
  })
}
</script>
