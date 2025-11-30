<template>
  <sar-segmented v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['Daily', 'Weekly', 'Monthly']

const value = ref('Daily')
</script>
