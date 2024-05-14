<template>
  <sar-grid>
    <sar-grid-item v-for="i in 4" :key="i">
      <view class="grid-box">{{ i }}</view>
    </sar-grid-item>
  </sar-grid>
</template>

<style lang="scss" scoped>
.grid-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128rpx;
  height: 128rpx;
  font-size: 48rpx;
  background-color: var(--sar-secondary-bg);
  border-radius: 50%;
}
</style>
