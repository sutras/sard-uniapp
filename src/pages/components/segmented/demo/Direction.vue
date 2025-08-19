<template>
  <sar-space>
    <sar-segmented v-model="value" :options="options1" direction="vertical" />
    <sar-segmented v-model="value" :options="options2" direction="vertical" />
  </sar-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const options1 = ['home', 'card', 'message']

const options2 = [
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
