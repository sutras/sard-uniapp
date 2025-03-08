<template>
  <sar-navbar title="标题">
    <template #left>
      <sar-navbar-item>返回上一页</sar-navbar-item>
    </template>
    <template #right>
      <sar-navbar-item icon="search" icon-family="demo-icons" />
      <sar-navbar-item text="分享" />
      <sar-navbar-item>
        <sar-badge value="5">
          <sar-icon family="demo-icons" name="chat-dots" size="40rpx" />
        </sar-badge>
      </sar-navbar-item>
    </template>
  </sar-navbar>
</template>
