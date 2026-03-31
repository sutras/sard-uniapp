<template>
  <sar-color-picker-popout
    v-model:visible="visible"
    v-model="color"
    title="选择颜色"
    show-alpha
    format="rgb"
  />

  <sar-list card>
    <sar-list-item>
      <sar-button theme="primary" @click="visible = true">
        打开颜色选择器
      </sar-button>
    </sar-list-item>
    <sar-list-item>当前颜色：{{ color }}</sar-list-item>
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

const visible = ref(false)
const color = ref('')
</script>
