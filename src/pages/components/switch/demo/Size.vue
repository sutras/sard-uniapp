<template>
  <sar-switch v-model="checked" size="48rpx" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
