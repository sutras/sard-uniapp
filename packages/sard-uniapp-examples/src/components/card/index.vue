<template>
  <view class="card">
    <view class="card-title">{{ title }}</view>
    <view class="card-body">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
  }>(),
  {},
)
</script>

<style lang="scss">
.card {
  margin-bottom: 20px;
}

.card-title {
  margin-bottom: 10px;
  margin-left: 15px;
  font-size: 10px;
  color: var(--sar-tertiary-color);
}

.card-body {
  border-radius: 8px;
}
</style>
