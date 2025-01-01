<template>
  <view v-for="item in alignments" :key="item" class="wrapper">
    <sar-space :align="item">
      <view>{{ item }}</view>
      <sar-button>按钮</sar-button>
      <sar-avatar />
    </sar-space>
  </view>
</template>

<script lang="ts" setup>
const alignments = ['start', 'center', 'end', 'baseline'] as const
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid var(--sar-primary);
  margin-bottom: 20rpx;
}
</style>
