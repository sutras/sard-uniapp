<template>
  <sar-switch v-model="checked" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
