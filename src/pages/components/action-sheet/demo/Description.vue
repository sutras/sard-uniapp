<template>
  <sar-button @click="visible = true">显示</sar-button>
  <sar-action-sheet
    v-model:visible="visible"
    description="这是一段很长很长的描述信息"
    cancel="取消"
    :item-list="itemList"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, type ActionSheetItem } from 'sard-uniapp'

const visible = ref(false)
const itemList = ref([
  { label: '选项1' },
  { label: '选项2', description: '描述信息' },
  { label: '选项3' },
])

const onSelect = (item: ActionSheetItem) => {
  toast(item.label)
}
</script>
