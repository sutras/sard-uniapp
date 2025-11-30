<template>
  <sar-segmented v-model="value" :options="options" />

  <view class="flex mt-20">
    <sar-segmented v-model="value" :options="options" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  {
    value: 'home',
    icon: 'house-door-fill',
    iconFamily: 'demo-icons',
  },
  {
    value: 'card',
    icon: 'cart-fill',
    iconFamily: 'demo-icons',
  },
  {
    value: 'message',
    icon: 'chat-dots-fill',
    iconFamily: 'demo-icons',
  },
]

const value = ref('home')
</script>
