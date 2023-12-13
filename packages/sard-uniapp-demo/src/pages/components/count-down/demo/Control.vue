<template>
  <sar-grid clickable :columns="3">
    <sar-grid-item
      @click="() => elRef?.start()"
      icon="play-circle"
      icon-family="demo-icons"
      text="开始"
    />
    <sar-grid-item
      @click="() => elRef?.pause()"
      icon="pause-circle"
      icon-family="demo-icons"
      text="暂停"
    />
    <sar-grid-item
      @click="() => elRef?.reset()"
      icon="arrow-clockwise"
      icon-family="demo-icons"
      text="重置"
    />
  </sar-grid>

  <sar-count-down
    ref="elRef"
    :time="1000 * 10"
    format="ss:SSS"
    millisecond
    :auto-start="false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type CountDownExpose } from '@sard/uniapp'

const elRef = ref<CountDownExpose>()
</script>
