<template>
  <sar-image
    src="https://fastly.jsdelivr.net/npm/@sard/assets/images/cat100.jpg"
    width="240rpx"
    height="240rpx"
  ></sar-image>
  <sar-image
    src="https://fastly.jsdelivr.net/npm/@sard/assets/images/cat100.jpg"
    width="240rpx"
    height="240rpx"
    class="ml-10"
  >
    <template #error>
      <text class="text-sm">加载失败</text>
    </template>
  </sar-image>
</template>
