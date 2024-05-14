<template>
  <doc-title>单值选择</doc-title>
  <sar-slider :model-value="50" thumb-size="48rpx" track-size="20rpx" />

  <doc-title>范围选择</doc-title>
  <sar-slider
    range
    :model-value="[20, 80]"
    thumb-size="48rpx"
    track-size="20rpx"
  />
</template>
