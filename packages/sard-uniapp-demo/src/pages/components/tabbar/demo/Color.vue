<template>
  <sar-tabbar v-model:current="current" active-color="var(--sar-red)">
    <sar-tabbar-item
      :name="0"
      icon="house-door-fill"
      icon-family="demo-icons"
      text="首页"
    />
    <sar-tabbar-item
      :name="1"
      icon="cart-fill"
      icon-family="demo-icons"
      text="购物车"
    />
    <sar-tabbar-item
      :name="2"
      icon="chat-dots-fill"
      icon-family="demo-icons"
      text="消息"
    />
    <sar-tabbar-item
      :name="3"
      icon="person-fill"
      icon-family="demo-icons"
      text="我的"
    />
  </sar-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(0)
</script>
