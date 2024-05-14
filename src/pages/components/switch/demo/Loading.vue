<template>
  <sar-switch v-model="checked" :before-update="beforeUpdate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)

const beforeUpdate = (value: boolean) => {
  console.log(value)
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}
</script>
