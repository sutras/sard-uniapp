<template>
  <sar-accordion v-model="value">
    <sar-accordion-item name="1" extra="额外内容">
      <template #title>
        <view style="color: var(--sar-primary)">
          <sar-icon name="pencil-square" />
          <text class="ml-10">标题1</text>
        </view>
      </template>
      内容1
    </sar-accordion-item>
    <sar-accordion-item title="标题2" name="2">
      <template #extra>
        <view style="color: var(--sar-primary)">
          <text class="mr-10">额外内容</text>
          <sar-icon name="question-circle-fill" />
        </view>
      </template>
      内容2
    </sar-accordion-item>
    <sar-accordion-item title="标题3" name="3">
      <template #arrow="{ visible }">
        <sar-icon :name="visible ? 'double-up' : 'double-down'" />
      </template>
      内容3
    </sar-accordion-item>
  </sar-accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>
