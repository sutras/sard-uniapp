<template>
  <sar-button @click="visible = true">显示</sar-button>
  <sar-action-sheet
    v-model:visible="visible"
    show-cancel
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
  { label: '选项2' },
  { label: '选项3' },
])

const onSelect = (item: ActionSheetItem) => {
  toast(item.label)
}
</script>
