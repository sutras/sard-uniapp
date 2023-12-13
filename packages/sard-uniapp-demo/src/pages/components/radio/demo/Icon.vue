<template>
  <sar-radio-group v-model="value">
    <sar-radio v-for="item in list" :value="item.value" :key="item.value">
      <template #icon="{ checked }">
        <sar-icon
          family="demo-icons"
          size="40rpx"
          :name="checked ? 'heart-fill' : 'heart'"
        />
      </template>
      {{ item.label }}
    </sar-radio>
  </sar-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option1')
const list = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
]
</script>
