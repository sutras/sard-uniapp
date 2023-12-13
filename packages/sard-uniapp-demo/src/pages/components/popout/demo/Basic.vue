<template>
  <sar-list card>
    <sar-list-item hover arrow title="默认弹出框" @click="visible1 = true" />
    <sar-list-item hover arrow title="显示取消按钮" @click="visible2 = true" />
  </sar-list>

  <sar-popout title="标题" v-model:visible="visible1">
    <view style="padding-left: 32rpx; padding-right: 32rpx">
      <view>弹出框内容</view>
      <view>弹出框内容</view>
      <view>弹出框内容</view>
    </view>
  </sar-popout>

  <sar-popout
    show-cancel
    :show-close="false"
    title="标题"
    v-model:visible="visible2"
  >
    <view style="padding-left: 32rpx; padding-right: 32rpx">
      <view>弹出框内容</view>
      <view>弹出框内容</view>
      <view>弹出框内容</view>
    </view>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
</script>
