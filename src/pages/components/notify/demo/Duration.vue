<template>
  <sar-list card>
    <sar-list-item arrow hover title="显示不会消失的通知" @click="showNotice" />
    <sar-list-item arrow hover title="隐藏通知" @click="hideNotice" />
  </sar-list>
</template>

<script setup lang="ts">
import { notify } from 'sard-uniapp'

const showNotice = () => {
  notify('这是一条通知', {
    timeout: 0,
  })
}
const hideNotice = () => {
  notify.hide()
}
</script>
