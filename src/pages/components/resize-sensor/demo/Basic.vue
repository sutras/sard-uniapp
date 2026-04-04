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
      <view>width: {{ size?.width }}</view>
      <view>height: {{ size?.height }}</view>
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { type Size } from 'sard-uniapp'
import { ref } from 'vue'

const width = ref(50)
const height = ref(50)

const size = ref<Size>()

const onResize = (value: Size) => {
  size.value = value
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  height: 100px;
  background-color: var(--sar-primary);
}
</style>
