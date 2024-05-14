<template>
  <doc-title>只读</doc-title>
  <sar-password-input model-value="123456" readonly />
  <sar-password-input
    model-value="123456"
    plainText
    readonly
    root-style="margin-top: 20rpx"
  />

  <doc-title>禁用</doc-title>
  <sar-password-input model-value="123456" disabled />
  <sar-password-input
    model-value="123456"
    plainText
    disabled
    root-style="margin-top: 20rpx"
  />
</template>
