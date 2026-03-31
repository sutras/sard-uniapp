<template>
  <sar-space direction="vertical" size="large">
    <sar-list card>
      <sar-list-item class="px-0 py-20">
        <sar-color-picker v-model="hexColor" format="hex" />
      </sar-list-item>
      <sar-list-item>HEX：{{ hexColor }}</sar-list-item>
    </sar-list>

    <sar-list card>
      <sar-list-item class="px-0 py-20">
        <sar-color-picker v-model="rgbColor" format="rgb" show-alpha />
      </sar-list-item>
      <sar-list-item>RGB：{{ rgbColor }}</sar-list-item>
    </sar-list>

    <sar-list card>
      <sar-list-item class="px-0 py-20">
        <sar-color-picker v-model="hslColor" format="hsl" />
      </sar-list-item>
      <sar-list-item>HSL：{{ hslColor }}</sar-list-item>
    </sar-list>
  </sar-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hexColor = ref('#1989FA')
const rgbColor = ref('rgba(25, 137, 250, 0.8)')
const hslColor = ref('hsl(210, 96%, 54%)')
</script>
