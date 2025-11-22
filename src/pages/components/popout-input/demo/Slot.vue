<template>
  <sar-list card>
    <sar-list-item>
      <sar-popout-input
        v-model="value"
        placeholder="请选择"
        clearable
        @clear="toast('清除')"
        @click="toast('点击了')"
        @change="onChange"
      >
        <template #prepend>邮箱:</template>
        <template #append>@outlook.com</template>
      </sar-popout-input>
    </sar-list-item>
    <sar-list-item title="设置值" hover arrow @click="value = 'abc'" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard-uniapp'

const value = ref('')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
