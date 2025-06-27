<template>
  <sar-list>
    <sar-list-item title="标题">
      <template #value>
        <sar-switch :model-value="true" />
      </template>
    </sar-list-item>
    <sar-list-item arrow hover title="标题">
      <template #value>
        <sar-badge :value="20" />
      </template>
    </sar-list-item>
    <sar-list-item title="音量">
      <template #value>
        <sar-slider root-style="width: 600rpx" :value="50" />
      </template>
    </sar-list-item>

    <sar-list-item>
      <view
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20;
          gap: 10rpx;
        "
      >
        <image src="/static/logo.svg" style="width: 96rpx; height: 96rpx" />
        <view style="font-size: 40rpx">这是标题</view>
        <view>
          这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述...
        </view>
      </view>
    </sar-list-item>
    <sar-list-item>
      <sar-input inlaid placeholder="请输入用户名" />
    </sar-list-item>
    <sar-list-item>
      <sar-input inlaid type="password" placeholder="请输入密码" />
    </sar-list-item>
  </sar-list>
</template>
