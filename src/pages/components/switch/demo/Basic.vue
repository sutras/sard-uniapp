<template>
  <sar-switch v-model="checked" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
