<template>
  <sar-navbar flow>
    <template #left>
      <sar-navbar-item>
        <text style="margin-right: 4rpx">城市</text>
        <sar-icon name="down" size="32rpx" />
      </sar-navbar-item>
    </template>
    <sar-input placeholder="请输入关键词" root-style="border-radius: 9999px" />
    <template #right>
      <sar-navbar-item>搜索</sar-navbar-item>
    </template>
  </sar-navbar>
</template>
