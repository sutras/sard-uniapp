<template>
  <sar-list card>
    <sar-list-item>
      <sar-picker v-model="value" :columns="columns" />
    </sar-list-item>
    <sar-list-item title="当前值：" :value="String(value)" />
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

const value = ref<string | undefined>('河北省')
</script>
