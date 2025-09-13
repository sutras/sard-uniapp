<template>
  <sar-floating-bubble axis="both" magnet="x" :navbar-height="navbarHeight">
    <sar-icon family="demo-icons" name="chat-dots" size="48rpx" />
  </sar-floating-bubble>
</template>

<script setup lang="ts">
const navbarHeight = uni.upx2px(88)
</script>
