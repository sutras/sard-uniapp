<template>
  <sar-radio-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择"
    :options="options"
    @change="onChange"
  />

  <sar-list card>
    <sar-list-item>
      <sar-button @click="visible = true">
        {{ value ? value : '请选择' }}
      </sar-button>
    </sar-list-item>
    <sar-list-item
      title="设置为：'option3'"
      arrow
      hover
      @click="value = 'option3'"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `选项${i + 1}`,
    }
  })

const visible = ref(false)
const value = ref<string>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
