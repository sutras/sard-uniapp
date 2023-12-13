<template>
  <sar-search placeholder="请输入关键词" shape="round">
    <template #prepend>
      <sar-button
        type="pale-text"
        size="small"
        theme="body"
        root-style="margin-right: 12rpx"
      >
        <sar-icon name="upc-scan" family="demo-icons" size="32rpx" />
      </sar-button>
    </template>

    <template #inputPrepend>
      <sar-button type="pale-text" size="mini" theme="body">
        <sar-icon name="caret-down" size="28rpx" />
      </sar-button>
    </template>

    <template #inputAppend>
      <sar-button type="pale-text" size="mini" theme="body">
        <sar-icon name="camera" family="demo-icons" size="36rpx" />
      </sar-button>
    </template>
  </sar-search>

  <sar-search
    placeholder="请输入关键词"
    shape="round"
    root-style="margin-top: 40rpx"
  >
    <template #prepend>
      <sar-button
        type="pale-text"
        size="mini"
        theme="body"
        root-style="margin-right: 12rpx"
      >
        <sar-icon name="left" size="32rpx" />
      </sar-button>
    </template>

    <template #append>
      <sar-button
        type="pale-text"
        size="mini"
        theme="body"
        root-style="margin-left: 12rpx"
      >
        <sar-icon name="list-task" family="demo-icons" size="40rpx" />
      </sar-button>
    </template>
  </sar-search>
</template>
