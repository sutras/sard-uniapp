<template>
  <sar-list card>
    <sar-list-item title="模块宽度">
      <template #value>
        <sar-slider
          v-model="moduleWidth"
          :min="2"
          :max="6"
          show-scale
          style="width: 500rpx"
        />
      </template>
    </sar-list-item>
    <sar-list-item title="模块高度">
      <template #value>
        <sar-slider
          v-model="moduleHeight"
          :min="10"
          :max="100"
          style="width: 500rpx"
        />
      </template>
    </sar-list-item>
    <sar-list-item title="条颜色">
      <template #value>
        <view style="width: 500rpx">
          <sar-color-picker-input
            v-model="color"
            show-alpha
            show-presets
            clearable
          />
        </view>
      </template>
    </sar-list-item>
    <sar-list-item title="背景色">
      <template #value>
        <view style="width: 500rpx">
          <sar-color-picker-input
            v-model="background"
            show-alpha
            show-presets
            clearable
          />
        </view>
      </template>
    </sar-list-item>
    <sar-list-item>
      <sar-barcode
        value="123456789012"
        :width="moduleWidth"
        :height="moduleHeight"
        :background="background"
        :color="color"
      />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const moduleWidth = ref(2)
const moduleHeight = ref(100)
const color = ref('#000')
const background = ref('#d3e4ff')
</script>
