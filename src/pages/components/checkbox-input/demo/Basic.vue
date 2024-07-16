<template>
  <sar-list card>
    <sar-list-item>
      <sar-checkbox-input
        v-model="value"
        title="请选择"
        placeholder="请选择"
        clearable
        :options="options"
      />
    </sar-list-item>

    <sar-list-item title="当前值：" :value="`${JSON.stringify(value)}`" />
    <sar-list-item
      title="设置为：['option2', 'option3']"
      arrow
      hover
      @click="value = ['option2', 'option3']"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>()

const options = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `选项${i + 1}`,
    }
  })
</script>
