<template>
  <sar-checkbox-group v-model="value" @change="onChange">
    <sar-checkbox value="option1">选项1</sar-checkbox>
    <sar-checkbox value="option2">选项2</sar-checkbox>
    <sar-checkbox value="option3">选项3</sar-checkbox>
  </sar-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['option2'])

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
