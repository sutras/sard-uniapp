<template>
  <sar-list card>
    <sar-list-item hover arrow title="顶部位置" @click="onTopToast" />
    <sar-list-item hover arrow title="底部位置" @click="onBottomToast" />
  </sar-list>
</template>

<script setup lang="ts">
import { toast } from '@sard/uniapp'

const onTopToast = () => {
  toast('顶部位置', {
    position: 'top',
  })
}

const onBottomToast = () => {
  toast('底部位置', {
    position: 'bottom',
  })
}
</script>
