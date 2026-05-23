<template>
  <sar-button @click="onClick">显示</sar-button>
</template>

<script setup lang="ts">
import { actionSheet, toast } from 'sard-uniapp'

const onClick = () => {
  actionSheet({
    description: '请选择',
    itemList: [{ label: '选项1' }, { label: '选项2' }, { label: '选项3' }],
    showCancel: true,
    onSelect(item) {
      toast(item.label)
    },
  })
}
</script>
