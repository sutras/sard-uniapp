<template>
  <sar-notice-bar ref="noticeBarRef">
    {{ text }}
  </sar-notice-bar>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const text = ref('')
const noticeBarRef = ref()

setTimeout(() => {
  text.value = '这是一条很长很长很长很长很长很长很长很长很长很长的公告！'
  nextTick(() => {
    noticeBarRef.value.update()
  })
}, 1500)
</script>
