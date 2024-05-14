<template>
  <sar-search
    placeholder="请输入关键词"
    shape="round"
    root-style="padding-left: 8rpx"
  >
    <template #prepend>
      <sar-button
        type="pale-text"
        size="small"
        theme="neutral"
        root-style="margin-right: 8rpx"
      >
        <sar-icon name="upc-scan" family="demo-icons" size="32rpx" />
      </sar-button>
    </template>

    <template #input-prepend>
      <sar-button type="pale-text" size="mini" theme="neutral">
        <sar-icon name="caret-down" size="28rpx" />
      </sar-button>
    </template>

    <template #input-append>
      <sar-button type="pale-text" size="mini" theme="neutral">
        <sar-icon name="camera" family="demo-icons" size="36rpx" />
      </sar-button>
    </template>
  </sar-search>

  <sar-search
    placeholder="请输入关键词"
    shape="round"
    root-style="margin-top: 40rpx; padding-left: 12rpx; padding-right: 8rpx"
  >
    <template #prepend>
      <sar-button
        type="pale-text"
        size="mini"
        theme="neutral"
        root-style="margin-right: 12rpx"
      >
        <sar-icon name="left" size="32rpx" />
      </sar-button>
    </template>

    <template #append>
      <sar-button
        type="pale-text"
        size="mini"
        theme="neutral"
        root-style="margin-left: 12rpx"
      >
        <sar-icon name="list-task" family="demo-icons" size="40rpx" />
      </sar-button>
    </template>
  </sar-search>
</template>
