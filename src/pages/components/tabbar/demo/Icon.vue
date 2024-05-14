<template>
  <sar-tabbar v-model:current="current">
    <sar-tabbar-item
      :name="0"
      :icon="current === 0 ? 'house-door-fill' : 'house-door'"
      icon-family="demo-icons"
      text="首页"
    />
    <sar-tabbar-item
      :name="1"
      :icon="current === 1 ? 'cart-fill' : 'cart'"
      icon-family="demo-icons"
      text="购物车"
    />
    <sar-tabbar-item
      :name="2"
      :icon="current === 2 ? 'chat-dots-fill' : 'chat-dots'"
      icon-family="demo-icons"
      text="消息"
    />
    <sar-tabbar-item
      :name="3"
      :icon="current === 3 ? 'person-fill' : 'person'"
      icon-family="demo-icons"
      text="我的"
    />
  </sar-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)
</script>
