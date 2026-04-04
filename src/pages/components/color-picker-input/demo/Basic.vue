<template>
  <sar-list card>
    <sar-list-item>
      <sar-color-picker-input
        v-model="color"
        title="选择颜色"
        placeholder="请选择颜色"
        show-alpha
        show-format
        show-presets
        clearable
      />
    </sar-list-item>

    <sar-list-item
      title="当前值："
      :value="JSON.stringify(color) ?? 'undefined'"
    />
    <sar-list-item
      title="设置为："
      value="rgb(226, 20, 20)"
      hover
      arrow
      @click="color = 'rgb(226, 20, 20)'"
    />
    <sar-list-item title="清空" arrow hover @click="color = ''" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('rgba(25, 137, 250, 0.8)')
</script>
