<template>
  <sar-checkbox-group v-model="value" root-style="margin-top: 40rpx">
    <template #custom="{ toggle, value }">
      <sar-list card>
        <sar-list-item
          v-for="option in options"
          :key="option.value"
          :title="option.label"
          hover
          @click="toggle(option.value)"
        >
          <template #value>
            <sar-icon
              v-if="value.includes(option.value)"
              color="var(--sar-red)"
              size="32rpx"
              name="success"
            />
          </template>
        </sar-list-item>
      </sar-list>
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
