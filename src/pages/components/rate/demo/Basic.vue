<template>
  <sar-rate v-model="value" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
