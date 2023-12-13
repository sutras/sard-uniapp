<template>
  <sar-list card>
    <sar-list-item arrow hover title="在底部显示通知" @click="showNotice" />
    <sar-list-item arrow hover title="隐藏通知" @click="hideNotice" />
  </sar-list>
</template>

<script setup lang="ts">
import { notify } from '@sard/uniapp'

const showNotice = () => {
  notify('这是一条通知', {
    position: 'bottom',
  })
}
const hideNotice = () => {
  notify.hide()
}
</script>
