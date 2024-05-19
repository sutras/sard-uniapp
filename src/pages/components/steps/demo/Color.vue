<template>
  <sar-list card>
    <sar-list-item title="上一步" @click="prevStep" arrow hover />
    <sar-list-item title="下一步" @click="nextStep" arrow hover />
    <sar-list-item>
      <sar-steps
        :current="current"
        :item-list="itemList"
        center
        root-style="--sar-steps-icon-finish-color: var(--sar-orange);
          --sar-steps-icon-process-color: var(--sar-orange);
          --sar-steps-text-process-color: var(--sar-orange);
          --sar-steps-line-active-color: var(--sar-orange)"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type StepsItem } from 'sard-uniapp'

const current = ref(1)

const itemList: StepsItem[] = [
  { name: '步骤1' },
  { name: '步骤2' },
  { name: '步骤3' },
]

const prevStep = () => {
  current.value = current.value <= 0 ? 3 : current.value - 1
}

const nextStep = () => {
  current.value = current.value >= 3 ? 0 : current.value + 1
}
</script>
