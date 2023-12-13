<template>
  <sar-progress-bar :percent="100" status="success" />
  <sar-progress-bar
    :percent="50"
    status="warning"
    root-style="margin-top: 20rpx"
  />
  <sar-progress-bar
    :percent="50"
    status="error"
    root-style="margin-top: 20rpx"
  />
</template>
