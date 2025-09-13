<template>
  <sar-floating-bubble :navbar-height="navbarHeight" @click="toast('点击了')">
    <sar-icon family="demo-icons" name="chat-dots" size="48rpx" />
  </sar-floating-bubble>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'

const navbarHeight = uni.upx2px(88)
</script>
