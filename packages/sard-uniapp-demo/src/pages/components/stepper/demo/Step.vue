<template>
  <sar-stepper placeholder="数量" v-model="value" :step="5" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>
