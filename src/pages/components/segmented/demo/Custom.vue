<template>
  <sar-segmented v-model="value" :options="options">
    <sar-segmented-item
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      <view class="flex flex-col items-center">
        <view>
          <sar-icon :name="option.icon" :family="option.iconFamily" />
        </view>
        <view>{{ option.label }}</view>
      </view>
    </sar-segmented-item>
  </sar-segmented>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    label: '首页',
    value: 'home',
    icon: 'house-door-fill',
    iconFamily: 'demo-icons',
  },
  {
    label: '购物车',
    value: 'card',
    icon: 'cart-fill',
    iconFamily: 'demo-icons',
  },
  {
    label: '消息',
    value: 'message',
    icon: 'chat-dots-fill',
    iconFamily: 'demo-icons',
  },
]

const value = ref('home')
</script>
