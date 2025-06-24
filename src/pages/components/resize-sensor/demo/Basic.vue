<template>
  <sar-list card style="margin-bottom: 20rpx">
    <sar-list-item title="宽度">
      <template #value>
        <sar-slider v-model="width" style="width: 560rpx" />
      </template>
    </sar-list-item>
    <sar-list-item title="高度">
      <template #value>
        <sar-slider v-model="height" style="width: 560rpx" />
      </template>
    </sar-list-item>
    <sar-list-item>
      <view
        class="box"
        :style="{
          width: width + '%',
          height: height + 'px',
        }"
      >
        <sar-resize-sensor @resize="onResize" />
      </view>
    </sar-list-item>
    <sar-list-item>
      <view>width: {{ rect?.width }}</view>
      <view>height: {{ rect?.height }}</view>
      <view>top: {{ rect?.top }}</view>
      <view>left: {{ rect?.left }}</view>
      <view>right: {{ rect?.right }}</view>
      <view>bottom: {{ rect?.bottom }}</view>
    </sar-list-item>
  </sar-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const width = ref(50)
const height = ref(50)

const rect = ref<any>()

const onResize = (value: any) => {
  console.log(value)
  rect.value = value
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  height: 100px;
  background-color: var(--sar-primary);
}
</style>
