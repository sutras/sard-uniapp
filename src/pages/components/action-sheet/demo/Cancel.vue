<template>
  <sar-button @click="visible = true">显示</sar-button>
  <sar-action-sheet
    v-model:visible="visible"
    cancel="取消"
    :item-list="itemList"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const itemList = ref([{ name: '选项1' }, { name: '选项2' }, { name: '选项3' }])
</script>
