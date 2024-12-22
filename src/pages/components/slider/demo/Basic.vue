<template>
  <sar-slider v-model="value" @input="onInput" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)

const onInput = (value: any) => {
  console.log('input', value)
}

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
