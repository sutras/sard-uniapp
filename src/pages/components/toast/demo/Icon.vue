<template>
  <sar-list card>
    <sar-list-item hover arrow title="自定义图标" @click="onIconToast" />
    <sar-list-item hover arrow title="使用图标属性" @click="onIconPropToast" />
  </sar-list>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const onIconToast = () => {
  toast({
    title: '自定义图标提示',
    icon: 'chat-fill',
    iconFamily: 'sari',
  })
}

const onIconPropToast = () => {
  toast('使用 icon 属性', {
    icon: 'star-fill',
    iconFamily: 'sari',
  })
}
</script>
