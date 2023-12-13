<template>
  <sar-radio-group v-model="value">
    <sar-radio value="option1">选项1</sar-radio>
    <sar-radio value="option2">选项2</sar-radio>
  </sar-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
</script>
