<template>
  <sar-grid :columns="4" gap="20rpx">
    <sar-grid-item v-for="i in 8" :key="i" text="文字" icon="image" />
  </sar-grid>

  <sar-grid :columns="3" square gap="20rpx">
    <sar-grid-item v-for="i in 6" :key="i" text="文字" icon="image" />
  </sar-grid>
</template>
