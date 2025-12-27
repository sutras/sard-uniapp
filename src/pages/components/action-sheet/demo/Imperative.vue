<template>
  <sar-button @click="onClick">显示</sar-button>
</template>

<script setup lang="ts">
import { actionSheet, toast } from 'sard-uniapp'

const onClick = () => {
  actionSheet({
    description: '请选择',
    itemList: [{ name: '选项1' }, { name: '选项2' }, { name: '选项3' }],
    showCancel: true,
    onSelect(item) {
      toast(item.name)
    },
  })
}
</script>
