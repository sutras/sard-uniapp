<template>
  <sar-stepper placeholder="数量" v-model="value" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
