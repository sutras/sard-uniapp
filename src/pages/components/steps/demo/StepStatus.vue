<template>
  <sar-list card>
    <sar-list-item>
      <sar-steps :item-list="itemList" direction="vertical" />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { type StepsItem } from 'sard-uniapp'

const itemList: StepsItem[] = [
  { name: '第1节', description: '已学习', status: 'finish' },
  { name: '第2节', description: '学习中', status: 'process' },
  { name: '第3节', description: '未学习', status: 'wait' },
  { name: '第4节', description: '已学习', status: 'finish' },
  { name: '第5节', description: '出错了', status: 'error' },
]
</script>
