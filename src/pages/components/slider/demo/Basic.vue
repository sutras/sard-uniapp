<template>
  <sar-slider v-model="value" @change="onChange" />
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'
import { ref } from 'vue'

const value = ref(50)

const onChange = (value: number) => {
  toast(value)
}
</script>
