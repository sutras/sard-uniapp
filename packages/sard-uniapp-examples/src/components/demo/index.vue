<template>
  <view class="demo">
    <view class="demo-title">
      {{ title }}
    </view>
    <view class="demo-body">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style lang="scss" scoped>
.demo {
  margin-bottom: 40px;
}

.demo-title {
  margin-bottom: 10px;
  margin-left: 15px;
  border-left: 3px solid var(--sar-primary);
  padding-left: 5px;
  font-size: 14px;
  line-height: 1.15;
  color: var(--sar-tertiary-color);
}

.demo-body {
  padding: 0 15px;
}

@keyframes shakeY {
  0%,
  to {
    transform: translateZ(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(0, -10px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(0, 10px, 0);
  }
}
.attention {
  animation-duration: 1.3s;
  animation-name: shakeY;
}
</style>
