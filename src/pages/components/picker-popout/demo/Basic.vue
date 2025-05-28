<template>
  <sar-picker-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择"
    :columns="columns"
    @change="onChange"
  />

  <sar-list card>
    <sar-list-item>
      <sar-button @click="visible = true">
        {{ value ? value : '请选择' }}
      </sar-button>
    </sar-list-item>
    <sar-list-item
      title="设置为: 天津市"
      arrow
      hover
      @click="value = '天津市'"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ['北京市', '天津市', '河北省', '山东省']

const visible = ref(false)
const value = ref<string | undefined>('河北省')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
