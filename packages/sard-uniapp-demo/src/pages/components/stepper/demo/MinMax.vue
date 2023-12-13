<template>
  <sar-stepper placeholder="数量" v-model="value" :min="0" :max="5" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>
