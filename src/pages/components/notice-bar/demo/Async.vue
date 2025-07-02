<template>
  <sar-notice-bar>
    {{ text }}
  </sar-notice-bar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const text = ref('')

onMounted(() => {
  setTimeout(() => {
    text.value = '这是一条很长很长很长很长很长很长很长很长很长很长的公告！'
  }, 1500)
})
</script>
