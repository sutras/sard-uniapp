<template>
  <sar-popover direction="horizontal" :options="options" @select="onSelect">
    <sar-popover-reference>
      <sar-button>显示气泡弹出框</sar-button>
    </sar-popover-reference>
  </sar-popover>
</template>

<script setup lang="ts">
import { toast, type MenuOption } from '@sard/uniapp'

const options = [
  {
    text: '选项1',
    icon: 'upc-scan',
    iconFamily: 'demo-icons',
  },
  {
    text: '选项2',
  },
  {
    text: '选项3',
  },
]

const onSelect = (option: MenuOption) => {
  toast(option.text as string)
}
</script>
