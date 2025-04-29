<template>
  <doc-page title="仅头部拖拽">
    <sar-floating-panel :content-draggable="false">
      <view style="padding: 20rpx; text-align: center">内容不可拖拽</view>
      <sar-list>
        <sar-list-item
          v-for="i in 26"
          :key="i"
          :title="String.fromCharCode(i + 64)"
        ></sar-list-item>
      </sar-list>
    </sar-floating-panel>
  </doc-page>
</template>
