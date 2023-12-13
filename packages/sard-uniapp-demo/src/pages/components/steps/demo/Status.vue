<template>
  <sar-list card>
    <sar-list-item title="上一步" @click="prevStep" arrow hover />
    <sar-list-item title="下一步" @click="nextStep" arrow hover />
    <sar-list-item>
      <sar-steps
        :current="current"
        :item-list="itemList"
        direction="vertical"
        status="finish"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type StepsItem } from '@sard/uniapp'

const current = ref(1)

const itemList: StepsItem[] = [
  {
    name: '订单已提交',
    description: '01月01日 12:00',
  },
  {
    name: '正在处理中',
    description: '01月01日 12:05',
  },
  {
    name: '订单已完成',
    description: '01月01日 12:10',
  },
]

const prevStep = () => {
  current.value = current.value <= -1 ? 2 : current.value - 1
}

const nextStep = () => {
  current.value = current.value >= 2 ? -1 : current.value + 1
}
</script>
