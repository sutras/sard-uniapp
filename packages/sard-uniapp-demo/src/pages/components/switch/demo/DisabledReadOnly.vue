<template>
  <doc-title>只读</doc-title>
  <sar-switch readonly />
  <sar-switch :model-value="true" readonly root-style="margin-top: 10rpx" />

  <doc-title>禁用</doc-title>
  <sar-switch disabled />
  <sar-switch :model-value="true" disabled root-style="margin-top: 10rpx" />
</template>
