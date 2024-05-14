<template>
  <sar-stepper placeholder="数量" v-model="value" size="small" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>
