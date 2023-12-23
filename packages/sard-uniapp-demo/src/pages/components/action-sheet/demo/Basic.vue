<template>
  <sar-button @click="visible = true">显示</sar-button>
  <sar-action-sheet
    v-model:visible="visible"
    :item-list="itemList"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, type ActionSheetItem } from 'sard-uniapp'

const visible = ref(false)
const itemList = ref([
  {
    name: '选项1',
  },
  {
    name: '选项2',
  },
  {
    name: '选项3',
  },
])

const onSelect = (item: ActionSheetItem) => {
  toast(item.name as string)
}
</script>
