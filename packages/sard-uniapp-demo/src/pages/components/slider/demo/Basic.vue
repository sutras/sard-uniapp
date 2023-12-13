<template>
  <sar-slider v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>
