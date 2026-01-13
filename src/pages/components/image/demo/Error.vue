<template>
  <sar-image
    src="https://fastly.jsdelivr.net/nonexistent.jpg"
    width="240rpx"
    height="240rpx"
  ></sar-image>
  <sar-image
    src="https://fastly.jsdelivr.net/nonexistent.jpg"
    width="240rpx"
    height="240rpx"
    class="ml-10"
  >
    <template #error>
      <text class="text-sm">加载失败</text>
    </template>
  </sar-image>
</template>
