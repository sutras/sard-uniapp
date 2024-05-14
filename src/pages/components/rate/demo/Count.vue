<template>
  <sar-rate :model-value="3" :count="count" allow-half />
  <sar-slider :min="1" :max="9" v-model="count" allow-half />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(3)
</script>
