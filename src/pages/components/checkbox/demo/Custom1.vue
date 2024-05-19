<template>
  <sar-checkbox-group v-model="value">
    <template #custom="{ toggle, value }">
      <view>
        <sar-tag
          v-for="option in options"
          :key="option.value"
          theme="primary"
          root-style="margin-right: 20rpx"
          :plain="!value.includes(option.value)"
          @click="toggle(option.value)"
        >
          {{ option.label }}
        </sar-tag>
      </view>
    </template>
  </sar-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['option2'])

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
