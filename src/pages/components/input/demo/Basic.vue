<template>
  <sar-input
    v-model="value"
    placeholder="请输入"
    @input="onInput"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const onInput = (value: any) => {
  console.log('input', value)
}

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
