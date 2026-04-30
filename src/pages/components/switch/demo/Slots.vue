<template>
  <sar-switch v-model="checked" @change="onChange">
    <template #checked-text>
      <sar-icon name="success" />
    </template>
    <template #unchecked-text>
      <sar-icon name="close" />
    </template>
  </sar-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
