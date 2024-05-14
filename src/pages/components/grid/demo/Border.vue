<template>
  <sar-grid bordered>
    <sar-grid-item v-for="i in 8" :key="i" text="文字" icon="image" />
  </sar-grid>

  <sar-grid bordered gap="20rpx">
    <sar-grid-item v-for="i in 8" :key="i" text="文字" icon="image" />
  </sar-grid>
</template>
